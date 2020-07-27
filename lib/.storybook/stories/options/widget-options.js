import React from 'react';

const styles = {
  widget: {
    background: '#f8f8f8',
    borderRadius: '8px',
    margin: '32px 16px',
    padding: '8px',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,0.2)',
    fontFamily: 'sans-serif',
    fontSize: '0.9em',
  },
};

export default class WidgetOptionsWrapper extends React.PureComponent {
  static options = {
    scope: 'storybook',
  };

  render() {
    return <WidgetOptions {...this.props} />;
  }
}

function WidgetOptions({ uid }) {
  return <div style={styles.widget}>options</div>;
}
