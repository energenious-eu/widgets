import React from 'react';
import render from '../util/render';
import cleanup from '../util/cleanup';
import muteConsole from '../util/mute-console';

const UID = 123;

// ignore logs and warnings
console.log = jest.fn();
console.warn = jest.fn();

describe('React rendering', () => {
  beforeAll(muteConsole);
  afterEach(cleanup(UID));

  it('renders a simple widget correctly', () => {
    const Widget = () => <div id="widget">test success</div>;

    render(Widget, UID);

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

    render(Widget, UID);

    const widget = document.getElementById('widget');
    expect(widget).toBeTruthy();
    expect(widget.textContent).toEqual('test success');
  });

  it('sets correct options on mount', () => {
    class Widget extends React.Component {
      static options = {
        appendFooter: false,
        appendTooltip: false,
      };

      render() {
        return <div id="widget">test success</div>;
      }
    }

    render(Widget, UID);

    expect(document.querySelector('footer')).toBeFalsy();
    expect(document.querySelector('.widget-base-tooltip__container')).toBeFalsy();
  });
});
