---
title: "Examples"
metaTitle: "Widgets - Examples"
---

## Applying dark/light theme based on the hosting platform's preferences

To accomplish our goal, we need to have the ability to add some classes to our elements at runtime. Let us first outline the usage flow:

1. User adds a widget to a dashboard and chooses a dark theme.
2. The hosting platform knows that it should apply the dark theme to widget(s), but it does not know which elements can be styled in a particular widget.
3. The hosting platform invokes

```js
EmbeddableWidget.applyExternalCSSClasses({
  uid: WIDGET_UID,
  classes: [
    { role: "background", className: "background--dark" },
    { role: "foreground", className: "foreground--dark" }
  ]
});
```

4. The SDK applies styles to all elements under our widget (resolved by uid) which are found by

```ts
classes.forEach((externalClass: ExternalCSSClass) => {
  const querySelector = `[data-role="${externalClass.role}"]`;
  this.injectCSSClass({
    uid,
    className: externalClass.className,
    querySelector
  });
});
```

Note that, for the SDK to be able to style your widget, you have to define the appropriate `data-role` attributes on elements to be styled. These have to be consistent with the hosting platform's code too, otherwise no styles will be applied.
Example:

```jsx
const MyElement = () => <h2 data-role="heading">My widget</div>;
```

5. ✅ Success! User sees the dark-themed widget.
