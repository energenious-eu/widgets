---
title: "Global API"
metaTitle: "Widgets - Global API"
---

## Introduction

The methods listed here are available through:

```
window[`${widget_name}_Widget`]

```

where `widget_name` is (in this order of importance, 1. overwrites 2.):

1. `WIDGET_TITLE` environmental variable
2. `name` field of the `package.json` file from your project

Real life example:

```
# .env
WIDGET_TITLE=chart

# browser console
window['chart_Widget']
```

---

The options below are then available:

## isSingleton

Is the widget a singleton? (Can only appear once in DOM)

```ts
  static isSingleton(): boolean
```

## getState

Get the global Redux state from the component

```ts
  static getState(uid: UID): State | void
```

## resetState

Replace the current state with the one given in the second argument

```ts
  static resetState(uid = DEFAULT_UID, state?: State, props?: { [key: string]: any }): State
```

## setState

Set the state to the one given in the second argument

```ts
  static setState(uid = DEFAULT_UID, state: State)
```

## refresh

Refresh the widget - rerender or remount completely

```ts
  static refresh({
    remount = false,
    parentElement = null,
    uid = DEFAULT_UID,
    ...props
  }: {
    remount?: boolean;
    parentElement?: HTMLElement;
    uid?: UID;
    [key: string]: any;
  } = {})
```

## getOptions

Get the current widget options

```ts
  static getOptions(): Partial<Options>
```

## setOptions

Set the widget options

```ts
  static setOptions(options: Options, uid: UID = DEFAULT_UID): void
```

## modifyDOMElement

This function is generic to provide the developer with the ability to modify any widget's element in any way. We have implemented basic methods below to [inject style](#injectInlineStyle) or [add/remove class](#injectCSSClass).

> If `querySelector` is not passed, this function will only modify the widget's root element (specified by UID).

> If `querySelector` is passed, this function will modify all elements found by the selector under a particular widget in the DOM (specified by UID).

> Exemplary `modify` implementation: `(element) => element.setAttribute('style', style);`

```ts
  static modifyDOMElement({
    uid,
    querySelector,
    modify,
  }: {
    uid?: string;
    querySelector: string;
    modify: (element: Element) => void;
  }): void
```

## injectInlineStyle

Based on [modifyDOMElement](#modifyDOMElement), injects inline style attribute to an element.

```ts
  static injectInlineStyle({
    uid,
    querySelector,
    style,
  }: {
    uid: string;
    querySelector: string;
    style: string;
  }): void
```

## injectCSSClass

Based on [modifyDOMElement](#modifyDOMElement), injects CSS class to an element.

```ts
  static injectCSSClass({
    uid,
    querySelector,
    className,
  }: {
    uid?: string;
    querySelector: string;
    className: string;
  }): void
```

## removeCSSClass

Based on [modifyDOMElement](#modifyDOMElement), removes CSS class from an element.

```ts
  static removeCSSClass({
    uid,
    querySelector,
    className,
  }: {
    uid?: string;
    querySelector: string;
    className: string;
  }): void
```

## External classes

Used to group elements by particular roles. [Example](/widget-api/2-examples)

```ts
// exemplary roles are: 'background', 'foreground'
export interface ExternalCSSClass {
  role: string;
  className: string;
}
```

## applyExternalCSSClasses

Based on [modifyDOMElement](#modifyDOMElement), injects CSS classes to an element found by `role`.

```ts
  static applyExternalCSSClasses({ uid, classes }: { uid?: UID; classes: ExternalCSSClass[] }): void
```

## removeExternalCSSClasses

Based on [modifyDOMElement](#modifyDOMElement), removes CSS classes from an element found by `role`.

```ts
  static removeExternalCSSClasses({ uid, classes }: { uid?: UID; classes: ExternalCSSClass[] }): void
```

## getElement

Get HTML element with `uid`

```ts
  static getElement(uid: UID = DEFAULT_UID): HTMLElement | undefined
```
