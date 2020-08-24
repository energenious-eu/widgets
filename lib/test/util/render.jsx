import React from 'react';
import ReactDOM from 'react-dom';
import EmbeddableWidget from '../../src';

EmbeddableWidget.React = React;

function render(Widget, uid) {
  EmbeddableWidget.Widget = Widget;

  const root = document.createElement('div');
  root.setAttribute('id', 'root');

  document.body.appendChild(root);

  EmbeddableWidget.Engine = {
    createElement: (props) => {
      return <Widget {...props} />;
    },
    render: (component, el) => ReactDOM.render(component, el),
    unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node),
  };

  EmbeddableWidget.mount({ parentElement: '#root', uid });

  return root;
}

export default render;
