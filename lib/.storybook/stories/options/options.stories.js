import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import EmbeddableWidget from '../../../lib';
import { action } from '@storybook/addon-actions';
import WidgetOptionsWrapper from './widget-options';
import { withKnobs } from '@storybook/addon-knobs';
import { forceReRender } from '@storybook/react';
import { useMemo } from '@storybook/addons';

EmbeddableWidget.Widget = WidgetOptionsWrapper;
EmbeddableWidget.React = React;
EmbeddableWidget.Engine = {
  createElement: (props) => {
    return <WidgetOptionsWrapper {...props} {...actionsData} />;
  },
  render: (component, el) => ReactDOM.render(component, el),
  unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node),
};

const WidgetOptionsStory = ({ subscription }) => {
  const bodyWrapper = (
    <div id="body-wrapper">
      <div id="body1"></div>
    </div>
  );

  useEffect(() => {
    console.log('mounting');
    ReactDOM.render(bodyWrapper, document.getElementById('root'), () => {
      EmbeddableWidget.mount({
        parentElement: '#body1',
        uid: 1,
      });
    });

    return () => {
      console.log('unmounting');
    };
  }, []);

  return bodyWrapper;
};

export default {
  title: 'Options',
  component: WidgetOptionsStory,
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
};

export const actionsData = {
  broadcast: action('broadcast'),
  scopedBroadcast: action('scopedBroadcast'),
  multicast: action('multicast'),
  scopedMulticast: action('scopedMulticast'),
  callback: action('callback'),
};

export const SubscribeW = () => <WidgetOptionsStory subscription="subscribe" />;
