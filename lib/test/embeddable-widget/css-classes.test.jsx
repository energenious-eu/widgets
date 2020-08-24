import React from 'react';
import cleanup from '../util/cleanup';
import render from '../util/render';
import muteConsole from '../util/mute-console';
import EmbeddableWidget from '../../src';

const UID = 123;

describe('External CSS Classes', () => {
  beforeAll(muteConsole);
  afterEach(cleanup(UID));

  it('injects CSS class to a specific element', () => {
    const Widget = () => <div id="widget"></div>;
    render(Widget, UID);

    EmbeddableWidget.injectCSSClass({
      uid: UID,
      querySelector: '#widget',
      className: 'custom',
    });

    const widget = document.getElementById('widget');
    expect(widget.className).toEqual('custom');
  });

  it('removes CSS class from a specific element', () => {
    const Widget = () => <div id="widget"></div>;
    render(Widget, UID);

    EmbeddableWidget.injectCSSClass({
      uid: UID,
      querySelector: '#widget',
      className: 'custom',
    });
    EmbeddableWidget.removeCSSClass({
      uid: UID,
      querySelector: '#widget',
      className: 'custom',
    });

    const widget = document.getElementById('widget');
    expect(widget.className).toEqual('');
  });

  it('removes one of CSS classes from a specific element', () => {
    const Widget = () => <div id="widget"></div>;
    render(Widget, UID);

    EmbeddableWidget.injectCSSClass({
      uid: UID,
      querySelector: '#widget',
      className: 'custom',
    });
    EmbeddableWidget.injectCSSClass({
      uid: UID,
      querySelector: '#widget',
      className: 'custom-2',
    });
    EmbeddableWidget.removeCSSClass({
      uid: UID,
      querySelector: '#widget',
      className: 'custom-2',
    });

    const widget = document.getElementById('widget');
    expect(widget.className).toEqual('custom');
  });

  it('applies external CSS class to a specific element', () => {
    const Widget = () => <div data-role="role" id="widget"></div>;
    render(Widget, UID);

    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'custom' }],
    });

    const widget = document.getElementById('widget');
    expect(widget.className).toEqual('custom');
  });

  it('removes external CSS class from a specific element', () => {
    const Widget = () => <div data-role="role" id="widget"></div>;
    render(Widget, UID);

    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'custom' }],
    });
    EmbeddableWidget.removeExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'custom' }],
    });

    const widget = document.getElementById('widget');
    expect(widget.className).toEqual('');
  });

  it('removes one of external CSS classes from a specific element', () => {
    const Widget = () => <div data-role="role" id="widget"></div>;
    render(Widget, UID);

    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'custom' }],
    });
    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'custom-2' }],
    });
    EmbeddableWidget.removeExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'custom-2' }],
    });

    const widget = document.getElementById('widget');
    expect(widget.className).toEqual('custom');
  });

  it('applies external CSS class to all elements', () => {
    const Widget = () => (
      <>
        <div data-role="role" id="widget1"></div>
        <div data-role="role" id="widget2"></div>
      </>
    );
    render(Widget, UID);

    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'custom' }],
    });

    const widget1 = document.getElementById('widget1');
    const widget2 = document.getElementById('widget2');

    expect(widget1.className).toEqual('custom');
    expect(widget2.className).toEqual('custom');
  });

  it('applies different external CSS class to all elements', () => {
    const Widget = () => (
      <>
        <div data-role="back" id="widget1"></div>
        <div data-role="front" id="widget2"></div>
      </>
    );
    render(Widget, UID);

    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [
        { role: 'back', className: 'class-back' },
        { role: 'front', className: 'class-front' },
      ],
    });

    const widget1 = document.getElementById('widget1');
    const widget2 = document.getElementById('widget2');

    expect(widget1.className).toEqual('class-back');
    expect(widget2.className).toEqual('class-front');
  });

  it('removes external CSS class from all elements', () => {
    const Widget = () => (
      <>
        <div data-role="role" id="widget1"></div>
        <div data-role="role" id="widget2"></div>
      </>
    );
    render(Widget, UID);

    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'class-default' }],
    });
    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'class-back' }],
    });
    EmbeddableWidget.removeExternalCSSClasses({
      uid: UID,
      classes: [{ role: 'role', className: 'class-back' }],
    });

    const widget1 = document.getElementById('widget1');
    const widget2 = document.getElementById('widget2');

    expect(widget1.className).toEqual('class-default');
    expect(widget2.className).toEqual('class-default');
  });

  it('removes different external CSS classes from all elements', () => {
    const Widget = () => (
      <>
        <div data-role="back" id="widget1"></div>
        <div data-role="front" id="widget2"></div>
      </>
    );
    render(Widget, UID);

    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [
        { role: 'back', className: 'class-default' },
        { role: 'front', className: 'class-default' },
      ],
    });
    EmbeddableWidget.applyExternalCSSClasses({
      uid: UID,
      classes: [
        { role: 'back', className: 'class-back' },
        { role: 'front', className: 'class-front' },
      ],
    });
    EmbeddableWidget.removeExternalCSSClasses({
      uid: UID,
      classes: [
        { role: 'back', className: 'class-back' },
        { role: 'front', className: 'class-front' },
      ],
    });

    const widget1 = document.getElementById('widget1');
    const widget2 = document.getElementById('widget2');

    expect(widget1.className).toEqual('class-default');
    expect(widget2.className).toEqual('class-default');
  });
});
