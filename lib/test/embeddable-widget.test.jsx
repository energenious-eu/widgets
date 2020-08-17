import React from 'react';
import ReactDOM from 'react-dom';
import EmbeddableWidget from '../src/index';

console.log = jest.fn();
console.warn = jest.fn();

describe('React rendering', () => {
  EmbeddableWidget.React = React;

  it('renders a simple React widget correctly', () => {
    const Widget = () => <div id="widget">test success</div>;
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

    EmbeddableWidget.mount({ parentElement: '#root', uid: 123 });

    const widget = document.getElementById('widget');
    expect(widget).toBeTruthy();
    expect(widget.textContent).toEqual('test success');
  });
});
