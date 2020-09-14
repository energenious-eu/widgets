---
title: "Configuration"
---

## Configuration

You can define the following static in the main Widget class:

- <code>externalScripts</code> (static) e.g.:

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

- <code>options</code> (static) - options that apply to all widgets in the same namespace, e.g.:

  > They will override `options` from `defaultProps`

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
