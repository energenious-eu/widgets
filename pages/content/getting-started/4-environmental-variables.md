---
title: "Environmental Variables"
metaTitle: "Widgets - Environmental Variables"
---

### Usage

To use the environmental variables, create a `.env` file at the root of your project. Then fill it with the variables you wish to use e.g. like so:

```
WIDGET_TITLE=My widget
```

The following environmental variables are evaluated at runtime, overwrite them to change the desired behaviour:

### WIDGET_TITLE

The widget title displayed in the main page (default to project's title in package.json file)

### WIDGET_MAIN_CSS_CLASS

Add a class name to every element of the widget to increase specificity.

### WIDGET_HIDE_EXPLANATION

Should the widget title and a link to the latest widget's version script be shown on the page?

### WIDGET_ASSET_SERVER

Path to the server used for static asset distribution (public path). Defaults to "/".

### WIDGET_USE_CLEANSLATE

Should a CSS reset be applied?

### WIDGET_UNCOMPRESSED

Should a compressed version of assets be provided in the production mode?

### PORT

The port to be used for the development server. Defaults to 80.
