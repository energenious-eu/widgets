---
title: "Environmental Variables"
---

## Environmental variables

The following environmental variables are evaluated at runtime, overwrite them to change the desired behaviour:

- <code>WIDGET_TITLE</code>: The widget title displayed in the main page (default to project's title in package.json file)
- <code>WIDGET_MAIN_CSS_CLASS</code>: Add a class name to every element of the widget to increase specificity.
- <code>WIDGET_HIDE_EXPLANATION</code>: Should the widget title and a link to the latest widget's version script be shown on the page?
- <code>WIDGET_ASSET_SERVER</code>: Path to the server used for static asset distribution (public path). Defaults to "/".
- <code>WIDGET_USE_CLEANSLATE</code>: Should a CSS reset be applied?
- <code>WIDGET_UNCOMPRESSED</code>: Should a compressed version of assets be provided in the production mode?
- <code>PORT</code>: The port to be used for the development server. Defaults to 80.
