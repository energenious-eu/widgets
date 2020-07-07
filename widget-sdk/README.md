# Tecnojest Widget Base

<!-- MarkdownTOC autolink="true" autoanchor="true" -->

- [Get started](#get-started)
    - [Existing project](#existing-project)
    - [New project](#new-project)
    - [Refractoring code base](#refractoring-code-base)
        - [ReactJS](#reactjs)
- [Configuration](#configuration)
    - [Object attributes](#object-attributes)
    - [Environmental variables](#environmental-variables)
    - [ReactJS](#reactjs-1)
- [Best practices](#best-practices)
    - [Variables](#variables)
    - [Prop types](#prop-types)
- [Contribute](#contribute)
    - [Hot reload](#hot-reload)
    - [Publish new version](#publish-new-version)

<!-- /MarkdownTOC -->


<a id="get-started"></a>
## Get started ##

To be able to use the widget API you need to integrate this package in your project. Follow the steps in [New project](#new-project) if you are creating a new project from scratch, or in [Existing project](#existing-project) if you are trying to run an existing project locally. In either case you will need to configure your local npm engine to point to Tecnojest's registry, by doing the following:

    # authenticate in the private npm registry
    npm login --registry https://npm.invidea.it
    # set the registry to point to @tecnojest's scope
    npm config set @tecnojest:registry https://npm.invidea.it

if during the first `npm login` step you receive a `UNABLE_TO_VERIFY_LEAF_SIGNATURE` error, then run:

    npm config set strict-ssl false

and try again

<a id="existing-project"></a>
### Existing project ###

Simply follow the instructions above to login and change configurations, then run the usual routine:    
    
    npm install
    npm start

<a id="new-project"></a>
### New project ###

1. init new project

        npm init

2. install widget base

        npm install @tecnojest/widget-base

3. add peer dependencies into devDependcies of package.json file:

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
            "@babel/preset-typescript": "^7.10.4",
            "@babel/preset-env": "^7.10.4",
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
3. (optional) create a file called <code>.gitignore</code> and paste the following lines:

    ```gitignore
    node_modules
    coverage
    **/dist/
    .DS_Store
    .env
    package-lock.json
    ```

4. install remaining packages (from official registry to speed up download)

        npm install --registry=https://registry.npmjs.org/

5. add start and build script into script part of package.json:

    ```json
    "scripts": {
        ...
        "build": "webpack-cli  --config ./node_modules/@tecnojest/widget-base/webpack.config.js --mode production",
        "start": "webpack-dev-server --config ./node_modules/@tecnojest/widget-base/webpack.config.js --host 0.0.0.0"
    }
    ```

6. create a "main" file named src/index.js in the project root dir, implementing the basic methods of the JavaScript API: 
    * <code>createElement(props)</code>: ...
    * <code>render(component,el)</code>: ...
    * <code>unmountComponentAtNode(node)</code>: ...

    when developing a widget based on React the configuration would be:

    ```js
    import EmbeddableWidget from "@tecnojest/widget-base"
    import Widget from "./components/widget";
    import React from 'react';
    import ReactDOM from 'react-dom';

    EmbeddableWidget.Widget = Widget;
    EmbeddableWidget.React = React;
    EmbeddableWidget.Engine = {
        createElement: (props) => { return <Widget className={process.env.WIDGET_MAIN_CSS_CLASS} {...props}/> },
        render: (component,el) => ReactDOM.render(component,el),
        unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node)
    };

    export default EmbeddableWidget;
    ```
    This file must include at least the EmbeddableWidget.Engine part, implementing the three methods <code>createElement(...)</code>, <code>render(...)</code>, and <code>unmountComponent(...)</code> - (the example above uses React and ReactDOM).

    Note: If you also use ReactJS then install the basic modules: <code>npm install react react-dom</code>

7. start project
    
        npm start

<a id="refractoring-code-base"></a>
### Refractoring code base ###

<a id="reactjs"></a>
#### ReactJS ####

* If you have bootstrapped your application using the <code>create-react-app</code> scripts, follow the steps for getting started in an [New project](#new-project) and make sure that you substitute the content of the default index.js file with the new index.js from step 5. Simply change this line in that code snippet:

        import Widget from "./App";


<a id="configuration"></a>
## Configuration ##

<a id="object-attributes"></a>
### Object attributes ###

You can define the following static in the main Widget class:

* <code>external_scripts</code> (static) e.g.:

        static external_scripts = [{
            'name': 'jquery-validate',
            'src': 'https://ajax.aspnetcdn.com/ajax/jquery.validate/1.7/jquery.validate.min.js'
            'depends_on': 'jquery'
        },{
            'name': 'jquery',
            'src': 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.js'
        }];

* <code>options</code> (static) - options that apply to all widgets in the same namespace, e.g.:
    
        static options: {        
          appendFooter: false,
          appendTooltip: true,
          singleton: true,
        }


<a id="environmental-variables"></a>
### Environmental variables ###

The following environmental variables are evaluated at runtime, overwrite them to change the desired behaviour:

* <code>WIDGET_TITLE</code>: The widget title displayed in the main page (default to project's title in package.json file)
* <code>WIDGET_MAIN_CSS_CLASS</code>: Add a class name to every element of the widget to increase specificity.
* <code>WIDGET_HIDE_EXPLANATION</code>: Should the widget title and a link to the latest widget's version script be shown on the page?
* <code>WIDGET_ASSET_SERVER</code>: Path to the server used for static asset distribution (public path). Defaults to "/".
* <code>WIDGET_USE_CLEANSLATE</code>: Should a CSS reset be applied?
* <code>WIDGET_UNCOMPRESSED</code>: Should a compressed version of assets be provided in the production mode?
* <code>PORT</code>: The port to be used for the development server. Defaults to 80.

<a id="reactjs-1"></a>
### ReactJS ###

If you use any default props in the component, define them as a static attribute in your component class definition, e.g.:

    static defaultProps = { ... };


<a id="best-practices"></a>
## Best practices ##

<a id="variables"></a>
### Variables ###
The widget base already includes Webpack DotEnv plugin to parse environmental variables. We therefore suggest to create a file called <code>.env</code> in the project root and define all the variables as key=value lines. We also advise to include this file in your <code>.gitignore</code>.

<a id="prop-types"></a>
### Prop types ###

If you are using ReactJS for programming the Widget: use PropTypes!!


<a id="contribute"></a>
## Contribute ##

<a id="hot-reload"></a>
### Hot reload ###

Link packages:

    npm link # in package folder of @tecnojest/widget-base
    npm link @tecnojest/widget-base


<a id="publish-new-version"></a>
### Publish new version ###

Apply all needed modifications, then when ready to publish run:

    npm run deploy

