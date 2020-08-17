import React from 'react';
import ReactDOM from 'react-dom';
import EmbeddableWidget from '../src/index';

const UID = 123;

// ignore logs and warnings
console.log = jest.fn();
console.warn = jest.fn();

const render = (Widget) => {
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

  EmbeddableWidget.mount({ parentElement: '#root', uid: UID });

  return root;
};

describe('React rendering', () => {
  EmbeddableWidget.React = React;

  afterEach(() => {
    EmbeddableWidget.unmount({ uid: UID });

    const root = document.getElementById('root');
    document.body.removeChild(root);
  });

  it('renders a simple widget correctly', () => {
    const Widget = () => <div id="widget">test success</div>;

    render(Widget);

    const widget = document.getElementById('widget');
    expect(widget).toBeTruthy();
    expect(widget.textContent).toEqual('test success');
  });

  it('renders a class component', () => {
    class Widget extends React.Component {
      render() {
        return <div id="widget">test success</div>;
      }
    }

    render(Widget);

    const widget = document.getElementById('widget');
    expect(widget).toBeTruthy();
    expect(widget.textContent).toEqual('test success');
  });

  it('sets correct options on mount', () => {
    class Widget extends React.Component {
      static options = {
        appendFooter: false,
        appendTooltip: false,
        className: 'custom',
      };

      render() {
        return <div id="widget">test success</div>;
      }
    }

    render(Widget);

    const widget = document.getElementById('widget');

    expect(widget.parentElement.className).toEqual('custom');

    expect(document.querySelector('footer')).toBeFalsy();
    expect(document.querySelector('#widget-base-tooltip__container')).toBeFalsy();
  });
});
