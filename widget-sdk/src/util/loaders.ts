import { Style, Script, Options } from '../types';

const semver = require('semver');

export const loadStyles = (styles: Style[] = []): void => {
  styles.map(({ src, name }) => {
    if (!document.getElementById(name) || !name) {
      const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
      const link: HTMLLinkElement = document.createElement('link');
      link.id = name;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = src;
      link.media = 'all';
      head.appendChild(link);
    }
  });

  if (process.env.WIDGET_USE_CLEANSLATE) {
    require('!style-loader!css-loader!../styles/cleanslate-strong.css');
  }
};

const scriptAlreadyLoaded = ({
  name,
  src,
  minVersion,
  maxVersion,
  loaded,
}: Script): boolean => {
  if (loaded) return !!loaded;
  let alreadyLoaded: boolean = !!document.querySelector('script#' + name);
  name = name.toLowerCase();

  const includesJquery: boolean = name.includes('jquery');
  const isJquery: boolean =
    src.includes('jquery.js') || src.includes('jquery.js') || name === 'jquery';
  if (!alreadyLoaded) {
    let namespace: any;
    if (includesJquery) {
      if (typeof window['$'] == 'function') namespace = window['$'];
      else if (typeof window['jQuery'] == 'function') namespace = window['jQuery'];
      else namespace = window['jQuery'] || window['$'] || window['JQuery'];
      if (namespace && !isJquery) {
        namespace = namespace[name.replace('jquery-', '')];
      }
      if (namespace && isJquery) namespace = { version: namespace.fn.jquery };
    } else {
      namespace = window[name];
    }

    alreadyLoaded = !!namespace;
    if (alreadyLoaded) {
      const version = namespace.version;
      console.warn(
        'Namespace version, ',
        version,
        'of',
        name,
        'already loadad'
      );
      if (minVersion && !semver.gt(version, semver.coerce(minVersion))) {
        throw Error(
          `Version ${version} of ${name} is lower than min version ${minVersion}`
        );
      }
      if (maxVersion && !semver.lt(version, maxVersion)) {
        throw Error(
          `Version ${version} of ${name} is higher than min version ${maxVersion}`
        );
      }
    }
  }
  return !!alreadyLoaded;
};

// TODO: 100+ lines long function, could refactor
export const loadScript = ({
  script,
  options = {},
  scripts = [],
}: {
  script: Script;
  options: Partial<Options>;
  scripts: Script[];
}) => {
  const { src, name, dependsOn } = script;
  return new Promise((resolve, reject) => {
    if (scriptAlreadyLoaded(script)) {
      resolve();
      return;
    }

    if (options.loadScriptAJAX || script.authenticate) {
      const headers = {};
      if (options.tokenName) {
        const token: string | null = localStorage.getItem(options.tokenName);
        if (script.authenticate && token) headers['Authorization'] = 'Bearer ' + token;
      }

      const parent: Script =
        scripts[scripts.findIndex((s) => s.name === script.dependsOn)];
      if (parent && !scriptAlreadyLoaded(parent)) {
        //&& !parent.isLoading)
        console.log(
          'script',
          name,
          'going after',
          parent,
          scriptAlreadyLoaded(parent)
        );
        loadScript({ script: parent, options, scripts })
          .then(() => {
            loadScript({ script, options, scripts })
              .then((r) => resolve(r))
              .catch((r) => reject(r));
          })
          .catch((e) => {
            console.error('error while loading ', name, e.message);
            reject(e);
          });
      } else {
        scripts[
          scripts.findIndex((s) => s.name === script.name)
        ].isLoading = true;
        fetch(src, {
          mode: 'cors',
          // credentials: 'include',
          headers,
        })
          .then((res) => res.text())
          .then((scrpt) => {
            eval.apply(null, [scrpt]);
            // Possible alternative to eval: new Function(scrpt).apply(null, [scrpt]);
            scripts[
              scripts.findIndex((s) => s.name === script.name)
            ].loaded = true;
            scripts[
              scripts.findIndex((s) => s.name === script.name)
            ].isLoading = false;
            console.warn('here loading ', name);
            resolve();
            return;
          })
          .catch((err) => {
            console.error('error while loading ', name, err.message);
            reject(err);
            return;
          });
      }
    } else {
      const scriptEl: HTMLScriptElement = document.createElement('script');
      scriptEl.id = name;
      scriptEl.src = src;
      scriptEl.addEventListener('load', () => {
        resolve();
      });
      scriptEl.addEventListener('error', (e) => {
        reject(e);
      });

      const parent: HTMLScriptElement | null = dependsOn
        ? document.querySelector('script#' + dependsOn)
        : null;
      if (parent) {
        parent.addEventListener('load', () => {
          if (scriptAlreadyLoaded(script)) {
            resolve();
            return;
          }
          document.body.appendChild(scriptEl);
        });
      } else {
        document.body.appendChild(scriptEl);
        // TODO: debug mode
        console.log('loading ', name);
      }
    }
  });
};
