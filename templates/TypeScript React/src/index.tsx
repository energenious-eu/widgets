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