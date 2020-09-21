---
title: "Engine API"
metaTitle: "Widgets - Engine API"
---

## Engine API Overview

## refresh

Refresh the widget, specifying the options described below.

```ts
  refresh?: ({
    parentElement,
    remount,
    uid: UID,
    el,
    component,
    props
  }: {
    parentElement: any;     // parent element of the widget
    remount: boolean;       // should the widget be unmounted and mounted again?
    uid: UID;               // unique identifier of the widget
    el: HTMLElement;        // the widget element
    component: Component;   // technology-specific component
    props: Partial<Props>;  // any props that you pass
  }) => void;
```

## createElement

Function used to create the component. Implementation is technology-dependent.

```ts
/**
 * e.g. for React use
 * `createElement: (props) => { return <Widget {...props}/> }`
 */
createElement: (props: Partial<Props>) => Component;
```

## render

Main function rendering the element to the DOM.

```ts
  /**
   * e.g. for React use
   * `render: (component,el) => ReactDOM.render(component,el)`
   */
  render: (component: Component, el: HTMLElement) => void;
```

## unmountComponentAtNode

Function used to unmount the component when should not be in the DOM anymore.

```ts
  /**
   * e.g. for React use
   * `unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node)`
   */
  unmountComponentAtNode: (node: HTMLElement) => void;
```

## resetState

> Optional

Overwrite the resetState function implementation

```ts
  resetState?: (uid: UID, state: State) => void;
```

## getState

> Optional

Overwrite the getState function implementation.

Example - omit some fields when sending request with state payload to the server

```ts
  getState?: (uid: UID) => State;
```
