import React from 'react';
import ReactDOM from 'react-dom';
import EmbeddableWidget from "@tecnojest/widget-base"
import Widget from "./components/widget";

EmbeddableWidget.Widget = Widget;
EmbeddableWidget.React = React;
EmbeddableWidget.Engine = {
  createElement: (props) => { return <Widget {...props}/> },
  render: (component,el) => ReactDOM.render(component,el),
  unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node)
};

export default EmbeddableWidget;