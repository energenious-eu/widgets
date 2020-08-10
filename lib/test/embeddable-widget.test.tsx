import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import EmbeddableWidget from '../src/index';

it('renders correctly', () => {
  const Widget = () => <div>Hello testing</div>;

  document.body.innerHTML = '<div id="body"></div>';

  EmbeddableWidget.Widget = Widget;
  EmbeddableWidget.React = React;
  EmbeddableWidget.Engine = {
    createElement: (props) => {
      return <Widget {...props} />;
    },
    render: (component, el) => ReactDOM.render(component, el),
    unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node),
  };

  EmbeddableWidget.mount({ parentElement: '#body', uid: 123 });

  // expect(tree).toMatchInlineSnapshot('<div id="body"></div>');
});
