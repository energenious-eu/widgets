---
title: "Configuration"
metaTitle: "Widgets - Configuration"
---

> ⚠ Remember that all of these have to be `static`

## static externalScripts

To import e.g. `jQuery` or any other external dependency which should be shared among your components, you can define the following static in the main Widget class:

```js
static externalScripts = [
  {
    'name': 'jquery-validate',
    'src': 'https://ajax.aspnetcdn.com/ajax/jquery.validate/1.7/jquery.validate.min.js'
    'depends_on': 'jquery'
  },
  {
    'name': 'jquery',
    'src': 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.js'
  }
];
```

## static options

> These will override `options` from `defaultProps`

Options that apply to all widgets in the same namespace, e.g.:

```ts
static options: Options = {
  appendFooter: true;
  appendTooltip: true;
  singleton: true;
}
```

The above are a subset of the `Options` object below:

```ts
interface Options {
  // should append a footer at the bottom
  appendFooter?: boolean;
  // should append a tooltip with dependencies at the bottom
  appendTooltip?: boolean;
  // can only one widget of the type exist
  singleton?: boolean;
  // should a cookie be set with the token
  setCookie?: boolean;
  // cookie domain used for setting the cookie
  setCookieDomain?: string | null;
  // should use AJAX to load the script instead of appending a <script> tag
  loadScriptAJAX?: boolean;
  // the token used for authentication
  token?: string;
  // name of the token (the key in localstorage)
  tokenName?: string;
  // main css class of the widget
  className?: string;
  // credentials can be saved here from the hosting environment
  credentials?: string | Object;
  // can be used to emit scoped events
  scope?: string;
}
```

## Example - pass a callback through options

See how to use `options` in a different way - to react to a change that happened on the hosting platform. [Example](/widget-api/methods)
