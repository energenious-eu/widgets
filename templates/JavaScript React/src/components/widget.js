import React from 'react';

// This must be a class component
class WidgetComponent extends React.Component {
  // Specify additional Widget options as static properties
  static dependencies = [];

  render() {
    return <h1>My JavaScript React Widget</h1>;
  }
}

export default WidgetComponent;
