---
title: "Installation"
metaTitle: "Widgets - Installation"
---

First, follow the [getting started guide](/getting-started).

To be able to use the widget API you need to integrate this package in your project. Follow the steps in [New project](#new-project) if you are creating a new project from scratch, or in [Existing project](#existing-project) if you are trying to run an existing project locally.

<a id="existing-project"></a>

### Existing project

Simply follow the instructions above to login and change configurations, then run the usual routine:

```bash
npm install
npm start
```

<a id="new-project"></a>

### New project

### 1. Init new project

```bash
npm init
```

### 2. If you do not have access to the @tecnojest npm namespace skip this step and refer to Getting started to see how you can use the lib, else:

```bash
npm install @tecnojest/widget-base
```

### 3. Add peer dependencies into devDependcies of package.json file:

```json
"devDependencies": {
  ...
  "@babel/core": "7.7.4",
  "@babel/plugin-proposal-class-properties": "7.7.4",
  "@babel/plugin-proposal-decorators": "7.7.4",
  "@babel/plugin-proposal-export-namespace-from": "7.7.4",
  "@babel/plugin-proposal-function-sent": "7.7.4",
  "@babel/plugin-proposal-json-strings": "7.7.4",
  "@babel/plugin-proposal-numeric-separator": "7.7.4",
  "@babel/plugin-proposal-throw-expressions": "7.7.4",
  "@babel/plugin-syntax-dynamic-import": "7.7.4",
  "@babel/plugin-syntax-import-meta": "7.7.4",
  "babel-eslint": "10.1.0",
  "babel-loader": "8.1.0",
  "babel-preset-airbnb": "4.4.0",
  "clean-webpack-plugin": "^3.0.0",
  "compression-webpack-plugin": "^3.1.0",
  "copy-webpack-plugin": "5.0.5",
  "css-loader": "3.2.0",
  "cssimportant-loader": "0.4.0",
  "dotenv": "^8.2.0",
  "dotenv-webpack": "^1.7.0",
  "duplicate-package-checker-webpack-plugin": "^3.0.0",
  "eslint": "6.7.1",
  "eslint-config-airbnb": "18.0.1",
  "eslint-loader": "3.0.2",
  "eslint-plugin-import": "2.18.2",
  "eslint-plugin-jsx-a11y": "6.2.3",
  "eslint-plugin-react": "7.17.0",
  "eslint-plugin-react-hooks": "1.7.0",
  "file-loader": "^6.0.0",
  "html-webpack-plugin": "^3.2.0",
  "mini-css-extract-plugin": "0.8.0",
  "node-sass": "4.13.0",
  "postcss-increase-specificity": "0.6.0",
  "postcss-loader": "3.0.0",
  "raw-loader": "^4.0.1",
  "sass-loader": "8.0.0",
  "source-map-loader": "^1.0.1",
  "style-loader": "1.0.1",
  "tape": "^4.13.0",
  "uglify-loader": "^3.0.0",
  "uglifyjs-webpack-plugin": "^2.2.0",
  "url-loader": "^4.0.0",
  "webpack": "4.42.0",
  "webpack-cli": "3.3.10",
  "webpack-dev-server": "3.10.3",
  "webpack-obfuscator": "0.18.5",
  "webpack-serve": "3.2.0",
  "webpack-shell-plugin": "^0.5.0"
}
```

### 4. Create a file called .gitignore and paste the following lines:

```
gitignore
node_modules
coverage
**/dist/
.DS_Store
.env
package-lock.json
```

### 5. Install remaining packages (from official registry to speed up download)

```bash
npm install --registry=https://registry.npmjs.org/
```

### 6. Add start and build scripts into the scripts part of package.json:

```json
"scripts": {
    ...
    "build": "webpack-cli  --config ./node_modules/@tecnojest/widget-base/webpack.config.js --mode production",
    "start": "webpack-dev-server --config ./node_modules/@tecnojest/widget-base/webpack.config.js --host 0.0.0.0"
}
```

### 7. Create a main file named src/index.js in the project root directory, implementing the basic methods of the API:

- `createElement(props)`: ...
- `render(component,el)`: ...
- `unmountComponentAtNode(node)`: ...

when developing a widget based on React the configuration would be:

### Index file

```jsx
import React from "react";
import ReactDOM from "react-dom";
import EmbeddableWidget from "@tecnojest/widget-base";
import Widget from "./components/widget";

EmbeddableWidget.Widget = Widget;
EmbeddableWidget.React = React;
EmbeddableWidget.Engine = {
  createElement: props => {
    return <Widget className={process.env.WIDGET_MAIN_CSS_CLASS} {...props} />;
  },
  render: (component, el) => ReactDOM.render(component, el),
  unmountComponentAtNode: node => ReactDOM.unmountComponentAtNode(node)
};

export default EmbeddableWidget;
```

This file must include at least the EmbeddableWidget.Engine part, implementing the three methods `createElement(...)`, `render(...)`, and `unmountComponent(...)` - (the example above uses React and ReactDOM).

### React

If you wish to use React in your project, refer to [React Configuration](/getting-started/react-configuration)

### TypeScript

If you want to use TypeScript in your project, refer to [TypeScript Configuration](/getting-started/typescript-configuration)

### 8. Start the project

```
npm start
```
