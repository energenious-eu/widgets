import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import EmbeddableWidget from '../../../lib';
import { action } from '@storybook/addon-actions';
import WidgetWrapper from './widget';

EmbeddableWidget.Widget = WidgetWrapper;
EmbeddableWidget.React = React;
EmbeddableWidget.Engine = {
  createElement: (props) => {
    return <WidgetWrapper {...props} {...actionsData} />;
  },
  render: (component, el) => ReactDOM.render(component, el),
  unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node),
};

const WidgetStory = ({ subscription }) => {
  useEffect(() => {
    const bodyWrapper = (
      <div id="body-wrapper">
        <div key={1} id="body1"></div>
        <div key={2} id="body2"></div>
        <div key={3} id="body3"></div>
      </div>
    );
    ReactDOM.render(bodyWrapper, document.getElementById('root'));

    setTimeout(() => {
      EmbeddableWidget.mount({
        parentElement: '#body1',
        uid: 1,
      });
      EmbeddableWidget.mount({
        parentElement: '#body2',
        uid: 2,
        subscription,
      });
      EmbeddableWidget.mount({
        parentElement: '#body3',
        uid: 3,
        subscription,
      });
    }, 0);
  });

  return <></>;
};

export default {
  title: 'Events',
  component: WidgetStory,
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const actionsData = {
  broadcast: action('broadcast'),
  scopedBroadcast: action('scopedBroadcast'),
  multicast: action('multicast'),
  scopedMulticast: action('scopedMulticast'),
  callback: action('callback'),
};

export const Subscribe = () => <WidgetStory subscription="subscribe" />;
export const ScopedSubscribe = () => <WidgetStory subscription="scopedSubscribe" />;
export const SelectiveSubscribe = () => <WidgetStory subscription="selectiveSubscribe" />;
