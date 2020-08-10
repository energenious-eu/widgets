import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import EmbeddableWidget from '../../../lib';
import WidgetOptionsWrapper from './widget-options';
import { withKnobs, boolean, text, array, object } from '@storybook/addon-knobs';

const WidgetOptionsStory = (props) => {
  useEffect(() => {
    EmbeddableWidget.Widget = WidgetOptionsWrapper;
    EmbeddableWidget.React = React;
    EmbeddableWidget.Engine = {
      createElement: (props) => {
        return <WidgetOptionsWrapper {...props} />;
      },
      render: (component, el) => ReactDOM.render(component, el),
      unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node),
    };
  }, []);

  const optionsGroup = 'Options';
  const options = {
    appendTooltip: boolean('appendTooltip', false, optionsGroup),
    appendFooter: boolean('appendFooter', false, optionsGroup),
  };

  const staticVariablesGroup = 'Static variables';
  const staticVariables = {
    dependencies: array('dependencies', ['react, react-dom'], ',', staticVariablesGroup),
    defaultProps: object(
      'defaultProps',
      {
        options: {
          appendTooltip: false,
          appendFooter: false,
        },
      },
      staticVariablesGroup
    ),
  };

  useEffect(() => {
    for (const variable in staticVariables) {
      EmbeddableWidget[variable] = staticVariables[variable];
    }

    EmbeddableWidget.mount({
      parentElement: '#body1',
      uid: 1,
      options,
    });

    return () => {
      EmbeddableWidget.unmount({ uid: 1 });
    };
  });

  return <div id="body1"></div>;
};

export default {
  title: 'Options',
  component: WidgetOptionsStory,
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
};

export const Playground = () => <WidgetOptionsStory />;
