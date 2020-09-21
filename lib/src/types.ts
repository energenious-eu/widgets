// TODO: this type is a placeholder for every type that has to be specified
export type FIX_TYPE = any;

export type State = any;
export type Component = any;
export type Dependencies = string[];

export type UID = string;

export interface Options {
  appendFooter?: boolean;
  appendTooltip?: boolean;
  singleton?: boolean;
  setCookie?: boolean;
  setCookieDomain?: string | null;
  loadScriptAJAX?: boolean;
  token?: string;
  tokenName?: string;
  className?: string;
  credentials?: string | Object;
  scope?: string;
}

export interface Props {
  key: number;
  uid: UID;
  options: Options;
  className: string;
  [key: string]: unknown;
}

export interface Engine {
  refresh?: ({
    parentElement,
    remount,
    uid: UID,
    el,
    component,
    props,
  }: {
    parentElement: any;
    remount: boolean;
    uid: UID;
    el: HTMLElement;
    component: Component;
    props: Partial<Props>;
  }) => void;
  /**
   * e.g. for React use
   * `createElement: (props) => { return <Widget {...props}/> }`
   */
  createElement: (props: Partial<Props>) => Component;

  /**
   * e.g. for React use
   * `render: (component,el) => ReactDOM.render(component,el)`
   */
  render: (component: Component, el: HTMLElement) => void;
  /**
   * e.g. for React use
   * `unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node)`
   */
  unmountComponentAtNode: (node: HTMLElement) => void;

  resetState?: (uid: UID, state: State) => void;
  getState?: (uid: UID) => State;
}

export interface PackageJson {
  version: string;
  description: string;
  dependencies: Dependencies;
}

export interface Script {
  name: string;
  src: string;
  dependsOn: string;
  aliases: string[];

  minVersion: string;
  maxVersion: string;

  defer: boolean;
  isLoading: boolean;
  loaded: boolean;
  authenticate: boolean | undefined;
}

export interface Style {
  src: string;
  name: string;
}

export interface Widget extends Component {
  getState?: (uid: UID) => State;
  // Used for React implementation of widgets
  defaultProps?: { options: Options };
  options?: Options;
  externalScripts?: Script[];
  externalStyles?: Style[];
  dependencies?: Dependencies;
  packageJson?: PackageJson;
}

export interface Elements {
  [uid: number]: HTMLElement;
}

// exemplary roles are: 'background', 'foreground'
export interface ExternalCSSClass {
  role: string;
  className: string;
}
