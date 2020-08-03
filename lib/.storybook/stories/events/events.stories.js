import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import EmbeddableWidget from '../../../lib';
import { action } from '@storybook/addon-actions';
import WidgetEventsWrapper from './widget-events';

const WidgetEventsStory = ({ subscription }) => {
  useEffect(() => {
    EmbeddableWidget.Widget = WidgetEventsWrapper;
    EmbeddableWidget.React = React;
    EmbeddableWidget.Engine = {
      createElement: (props) => {
        return <WidgetEventsWrapper {...props} {...actionsData} />;
      },
      render: (component, el) => ReactDOM.render(component, el),
      unmountComponentAtNode: (node) => ReactDOM.unmountComponentAtNode(node),
    };

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
  }, []);

  return (
    <div id="body-wrapper">
      <div key={1} id="body1"></div>
      <div key={2} id="body2"></div>
      <div key={3} id="body3"></div>
    </div>
  );
};

export default {
  title: 'Events',
  component: WidgetEventsStory,
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

export const Subscribe = () => <WidgetEventsStory subscription="subscribe" />;
export const ScopedSubscribe = () => <WidgetEventsStory subscription="scopedSubscribe" />;
export const SelectiveSubscribe = () => <WidgetEventsStory subscription="selectiveSubscribe" />;
