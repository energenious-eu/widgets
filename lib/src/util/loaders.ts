import { Style, Script, Options } from '../types';

const semver = require('semver');

const getScriptElement = (name: string): HTMLScriptElement | null =>
  document.querySelector(`script[data-package="${name}"`);

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
  aliases,
  minVersion,
  maxVersion,
  loaded,
}: Script): boolean => {
  if (loaded) return true;

  const possibleScriptNames = aliases && aliases.length ? [name, ...aliases] : [name];

  let alreadyLoaded: boolean = possibleScriptNames.some(
    (possibleName) => !!getScriptElement(possibleName)
  );

  let namespace: any,
    namespaceName: string = '';
  possibleScriptNames.forEach((possibleName) => {
    if (window[possibleName]) {
      namespaceName = possibleName;
      namespace = window[possibleName];
    }
  });

  alreadyLoaded = !!namespace;
  if (alreadyLoaded) {
    const version = namespace.version || (namespace.fn && namespace.fn.jquery);
    console.warn('Namespace version,', version, 'of', name, 'already loaded under', namespaceName);
    if (minVersion && !semver.gt(version, semver.coerce(minVersion))) {
      throw Error(`Version ${version} of ${name} is lower than min version ${minVersion}`);
    }
    if (maxVersion && !semver.lt(version, maxVersion)) {
      throw Error(`Version ${version} of ${name} is higher than min version ${maxVersion}`);
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

      const parent: Script = scripts[scripts.findIndex((s) => script.dependsOn.includes(s.name))];
      if (parent && !scriptAlreadyLoaded(parent)) {
        console.log('script', name, 'going after', parent, scriptAlreadyLoaded(parent));
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
        scripts[scripts.findIndex((s) => s.name === script.name)].isLoading = true;
        fetch(src, {
          mode: 'cors',
          // credentials: 'include',
          headers,
        })
          .then((res) => res.text())
          .then((scrpt) => {
            eval.apply(null, [scrpt]);
            // Possible alternative to eval: new Function(scrpt).apply(null, [scrpt]);
            scripts[scripts.findIndex((s) => s.name === script.name)].loaded = true;
            scripts[scripts.findIndex((s) => s.name === script.name)].isLoading = false;
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
      scriptEl.dataset.package = name;
      scriptEl.src = src;
      scriptEl.addEventListener('load', () => {
        console.log('loaded', name);
        resolve();
      });
      scriptEl.addEventListener('error', (e) => {
        reject(e);
      });

      const parent: HTMLScriptElement | null = dependsOn ? getScriptElement(dependsOn) : null;
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
