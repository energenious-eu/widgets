import './styles/cleanslate.css';
import './styles/tooltip.css';
import { loadStyles } from './util/loaders';
import { parseClassName } from './util/parsers';
import {
  UID,
  Options,
  Engine,
  Elements,
  Widget,
  PackageJson,
  Props,
  State,
  FIX_TYPE,
  Script,
  Component,
  ExternalCSSClass,
} from './types';
import { createFooter } from './util/create-footer';
import { createTooltip } from './util/create-tooltip';
import { prepareScripts } from './util/prepare-scripts';
import EventManager from './events/event-manager';

const DEFAULT_UID: UID = '-1';

export default class EmbeddableWidget {
  static INITIAL_OPTIONS: Options = {
    appendFooter: true,
    appendTooltip: true,
    singleton: false,
    setCookie: false,
    setCookieDomain: null,
    loadScriptAJAX: false,
    tokenName: 'token',
    className: parseClassName(process.env.WIDGET_MAIN_CSS_CLASS),
  };
  /**
   * The engine configuration
   */
  static Engine: Engine;

  /**
   * Reference to React
   */
  static React: any;

  /**
   * Widgets as HTML mapped by uid
   */
  static elements: Elements = {};

  /**
   * Configuration options
   */
  static options: Options = {};

  /**
   * The actual widget component
   */
  static Widget: Widget;

  /**
   * Increased on every mount
   */
  static revision: number = 0;

  /**
   * Dependencies of the SDK and the widget
   */
  static dependencies: string[] = [];

  /**
   * Reference to package.json to obtain information about the packages
   */
  static packageJson: PackageJson = require('../package.json');

  private static setClassName({ props }: { props: Props }): void {
    const { className } = props.options;

    EmbeddableWidget.options.className = parseClassName(className);
  }

  static isSingleton(): boolean {
    return !!EmbeddableWidget.options.singleton;
  }

  static getState(uid: UID): State | void {
    if (EmbeddableWidget.Widget.getState) {
      return EmbeddableWidget.Widget.getState(uid);
    }
  }

  static resetState(uid = DEFAULT_UID, state?: State, props?: { [key: string]: any }): State {
    // TODO: refactor this to only check whether the element is valid
    EmbeddableWidget.getElement(uid);

    if (!EmbeddableWidget.Engine.resetState) {
      console.warn('EmbeddableWidget does not implement the .resetState() function!');
    } else {
      EmbeddableWidget.Engine.resetState(uid, state);
      state = EmbeddableWidget.getState(uid);
    }

    EmbeddableWidget.refresh({ uid, ...props });
    return state;
  }

  static setState(uid = DEFAULT_UID, state: State) {
    return EmbeddableWidget.resetState(uid, state);
  }

  static remount({ ...args }): void {
    EmbeddableWidget.refresh({ remount: true, ...args });
  }

  static refresh({
    remount = false,
    parentElement = null,
    uid = DEFAULT_UID,
    ...props
  }: {
    remount?: boolean;
    parentElement?: FIX_TYPE;
    uid?: UID;
    [key: string]: any;
  } = {}) {
    // TODO: use console.log only in debug mode
    if (!remount) console.log('Refreshing Widget');
    if (remount) console.log('Remounting Widget');

    const el: HTMLElement | undefined = EmbeddableWidget.getElement(uid);
    if (!el) {
      throw new Error('EmbeddableWidget has not been mounted yet, mount first!');
    }

    // Make sure that user cannot override options while refreshing
    props.options = EmbeddableWidget.overrideOptions(props.options);
    props.uid = uid;

    if (remount) {
      EmbeddableWidget.revision += 1;
      props.key = EmbeddableWidget.revision;
    }

    const component: Component = EmbeddableWidget.Engine.createElement(props);
    EmbeddableWidget.setClassName(component);

    if (EmbeddableWidget.Engine.refresh) {
      return EmbeddableWidget.Engine.refresh({
        parentElement,
        remount,
        uid,
        el,
        component,
        props,
      });
    }

    // Prevent mounting twice same UIDs
    if (parentElement) {
      const pel = document.querySelector(parentElement);
      const matches = Array.from<HTMLElement>(pel.querySelectorAll('div[uid]'));
      if (matches.filter((n) => n.getAttribute('uid') === el.getAttribute('uid')).length === 0) {
        pel.appendChild(el);
      }
    }

    if (remount) {
      EmbeddableWidget.Engine.render(component, el);
    }
  }

  static getOptions(): Partial<Options> {
    let { credentials, ...options } = EmbeddableWidget.options;
    return options;
  }

  private static overrideOptions(newOptions: Options): Options {
    const defaultOptionsFromProps: Partial<Options> = this.Widget.defaultProps
      ? this.Widget.defaultProps.options
      : {};

    const options: Options = {
      ...EmbeddableWidget.INITIAL_OPTIONS,
      ...EmbeddableWidget.options,
      ...defaultOptionsFromProps,
      ...this.Widget.options,
      ...newOptions,
    };

    if (options.token) {
      let cookie: string = 'token=' + options.token + '; secure';
      cookie += options.setCookieDomain ? `domain=.${options.setCookieDomain}` : '';
      if (options.setCookie) document.cookie = cookie;
      delete options.token;
    }

    return options;
  }

  static setOptions(options: Options, uid: UID = DEFAULT_UID): void {
    EmbeddableWidget.options = EmbeddableWidget.overrideOptions(options);

    if (EmbeddableWidget.isMounted(uid)) {
      return EmbeddableWidget.remount({ uid });
    }
  }

  static modifyWidget({
    uid,
    querySelector,
    modify,
  }: {
    uid?: string;
    querySelector: string;
    modify: (element: Element) => void;
  }): void {
    const element: HTMLElement | undefined = EmbeddableWidget.getElement(uid);

    if (!element) {
      console.error(`Could not inject style to element with uid ${uid}.`);
      return;
    }

    // modify root's attribute
    if (!querySelector) {
      modify(element);
      return;
    }

    const childNodes: HTMLElement[] = Array.from(element.querySelectorAll(querySelector));

    childNodes.forEach((childNode) => {
      if (!childNode) {
        console.error(
          `Could not inject style to child queried by ${querySelector} of element with uid ${uid}.`
        );
        return;
      }

      modify(childNode);
    });
    return;
  }

  static modifyAllWidgets({
    querySelector,
    modify,
  }: {
    querySelector: string;
    modify: (element: Element) => void;
  }): void {
    const childNodes: HTMLElement[] = Array.from(document.querySelectorAll(querySelector));

    childNodes.forEach((childNode) => {
      if (!childNode) {
        console.error('Could not find ', childNode);
        return;
      }

      modify(childNode);
    });
    return;
  }

  static modifyDOMElement({
    uid,
    querySelector,
    modify,
  }: {
    uid?: string;
    querySelector: string;
    modify: (element: Element) => void;
  }): void {
    return uid
      ? this.modifyWidget({ uid, querySelector, modify })
      : this.modifyAllWidgets({ querySelector, modify });
  }

  static injectInlineStyle({
    uid,
    querySelector,
    style,
  }: {
    uid: string;
    querySelector: string;
    style: string;
  }): void {
    function overrideStyle(element: Element): void {
      element.setAttribute('style', style);
    }

    return this.modifyDOMElement({
      uid,
      querySelector,
      modify: overrideStyle,
    });
  }

  static injectCSSClass({
    uid,
    querySelector,
    className,
  }: {
    uid?: string;
    querySelector: string;
    className: string;
  }) {
    function appendClass(element: Element): void {
      element.classList.add(className);
    }

    return this.modifyDOMElement({
      uid,
      querySelector,
      modify: appendClass,
    });
  }

  static removeCSSClass({
    uid,
    querySelector,
    className,
  }: {
    uid?: string;
    querySelector: string;
    className: string;
  }) {
    function removeClass(element: Element): void {
      element.classList.remove(className);
    }

    return this.modifyDOMElement({
      uid,
      querySelector,
      modify: removeClass,
    });
  }

  static applyExternalCSSClasses({ uid, classes }: { uid?: UID; classes: ExternalCSSClass[] }) {
    classes.forEach((externalClass: ExternalCSSClass) => {
      const querySelector = `[data-role="${externalClass.role}"]`;
      this.injectCSSClass({ uid, className: externalClass.className, querySelector });
    });
  }

  static removeExternalCSSClasses({ uid, classes }: { uid?: UID; classes: ExternalCSSClass[] }) {
    classes.forEach((externalClass: ExternalCSSClass) => {
      const querySelector = `[data-role="${externalClass.role}"]`;
      this.removeCSSClass({ uid, className: externalClass.className, querySelector });
    });
  }

  static checkElementMounted({ el, mount = true }: { el: HTMLElement; mount?: boolean }) {
    const uidAttribute: string | null = el.getAttribute('uid');
    const uid = uidAttribute ? uidAttribute : null;

    if (mount) {
      // check if element does not exist in DOM
      let matches: HTMLElement[] = Array.from<HTMLElement>(document.querySelectorAll('[uid]'));
      matches = matches.filter((m) => m.getAttribute('uid') == uidAttribute);
      if (matches.length > 1) {
        matches.map((m, i) => {
          if (i == 0) return;
          console.error(
            `Something went wrong, there are multiple nodes with uid ${uid}, removing`,
            m
          );
          m.remove();
        });
      }

      const match: boolean = matches.length > 0;
      if (!match && uid !== null && EmbeddableWidget.elements[uid]) {
        console.warn('Element with uid', uid, 'was unexpectedly removed from dom!');
        EmbeddableWidget.removeElement(el);
      } else if (match && uid !== null && !EmbeddableWidget.elements[uid]) {
        // this will never be reached ... but it could be interesting to implement it !!!
        console.warn('Element with uid', uid, 'was unexpectedly removed from namespace list!');
        EmbeddableWidget.addElement(el);
      }
    }

    const elements: Elements = EmbeddableWidget.elements;
    if (mount && uid !== null) {
      if (EmbeddableWidget.isSingleton() && Object.keys(elements).length > 0) {
        throw new Error('EmbeddableWidget is singleton, cannot be mounted more than once!');
      }
      if (elements[uid]) {
        throw new Error('EmbeddableWidget is already mounted, unmount first!');
      }
    } else if (uid === null || (!elements[uid] && !mount)) {
      throw new Error('EmbeddableWidget has not been mounted yet!');
    }
    return false;
  }

  static addElement(el: HTMLElement, uid?: UID): void {
    const actualUID = uid || el.getAttribute('uid');
    if (actualUID) {
      EmbeddableWidget.elements[actualUID] = EmbeddableWidget.elements[actualUID] || el;
    }
  }

  static removeElement(el: HTMLElement): void {
    const uid: string | null = el.getAttribute('uid');
    if (uid) {
      delete EmbeddableWidget.elements[uid];
    }
  }

  static getElement(uid: UID = DEFAULT_UID): HTMLElement | undefined {
    const el: HTMLElement | undefined = EmbeddableWidget.elements[uid];
    if (!el) {
      throw new Error('EmbeddableWidget does not contain element with id, ' + uid);
    }
    return el;
  }

  // TODO: This function is 100 lines long, maybe we could refactor some of it
  static mount({
    parentElement = null,
    uid = DEFAULT_UID,
    ...props
  }: { parentElement?: FIX_TYPE; uid?: UID; [key: string]: any } = {}) {
    // TODO: Use in debug
    console.log('mounting component with uid', uid);

    props.options = EmbeddableWidget.overrideOptions(props.options);
    props.uid = uid;

    const scope: string = props.options.scope || process.env.WIDGET_TITLE || props.uid;
    props.eventManager = new EventManager(scope, uid, parentElement);

    EmbeddableWidget.options = props.options;

    const component: Component = EmbeddableWidget.Engine.createElement(props);
    EmbeddableWidget.setClassName(component);

    function doRender({
      el,
      elementUid,
      state,
    }: {
      el: HTMLElement;
      elementUid: UID;
      state: State;
    }): void {
      let Footer: HTMLElement | undefined;
      let Tooltip: HTMLDivElement | undefined;

      if (parentElement) {
        document.querySelector(parentElement).appendChild(el);
      } else {
        document.body.appendChild(el);
      }

      if (EmbeddableWidget.options.appendFooter) Footer = createFooter();
      if (EmbeddableWidget.options.appendTooltip) {
        let deps: string[] = EmbeddableWidget.dependencies;
        const widgetDeps: string[] = EmbeddableWidget.Widget
          ? EmbeddableWidget.Widget.dependencies || []
          : [];

        deps = deps.concat(widgetDeps).filter((d) => !!d);

        Tooltip = createTooltip({
          dependencies: deps,
          packageJson: EmbeddableWidget.Widget.packageJson || EmbeddableWidget.packageJson,
        });
      }

      EmbeddableWidget.Engine.render(component, el);

      if (Footer) el.appendChild(Footer);
      if (Tooltip) el.appendChild(Tooltip);
      EmbeddableWidget.addElement(el, elementUid);
      EmbeddableWidget.resetState(elementUid, state, props);
    }

    function resolve(): void {
      const el: HTMLDivElement = document.createElement('div');
      const className: string | undefined = EmbeddableWidget.options.className;
      if (className) {
        el.setAttribute('class', className);
      }
      el.setAttribute('uid', uid.toLocaleString());

      EmbeddableWidget.checkElementMounted({ el });

      const widget: Widget = EmbeddableWidget.Widget;
      if (widget.externalScripts) {
        const skip: string[] = widget.externalScripts
          .filter((s: Script) => s.defer)
          .map((s: Script) => s.name);

        const promises: FIX_TYPE[] = prepareScripts(
          EmbeddableWidget.options,
          widget.externalScripts,
          skip
        );

        // Load e.g. jQuery before you load the styles and render the widget
        Promise.all(promises)
          .then(() => {
            loadStyles(widget.externalStyles);
            // TODO: load_media(Widget.mediaList) (define load_media)
            doRender({ el, elementUid: uid, state: props.state });
          })
          .catch((err) => console.warn('Error while loading scripts', err));
      } else {
        loadStyles(widget.externalStyles);
        doRender({ el, elementUid: uid, state: props.state });
      }
    }

    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', () => {
        resolve();
      });
    }
  }

  static unmount({ uid = DEFAULT_UID }: { uid: UID }): void {
    // TODO: debug mode
    console.log('Unmounting widget...');

    const el: HTMLElement | undefined = EmbeddableWidget.getElement(uid);
    if (!el) return;

    EmbeddableWidget.checkElementMounted({ el, mount: false });

    EmbeddableWidget.Engine.unmountComponentAtNode(el);

    const parentNode: (Node & ParentNode) | null = el.parentNode;
    if (parentNode) {
      parentNode.removeChild(el);
    }
    EmbeddableWidget.removeElement(el);
  }

  static isMounted(uid: UID = DEFAULT_UID) {
    let el: HTMLElement | undefined;

    try {
      el = EmbeddableWidget.getElement(uid);
      if (el) {
        return EmbeddableWidget.checkElementMounted({ el });
      }
      return false;
    } catch {
      return !!el;
    }
  }
}
