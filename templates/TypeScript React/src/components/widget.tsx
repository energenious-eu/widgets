import React, { Component } from 'react';
import { Dependencies } from '@tecnojest/widget-base';

// This must be a class component
class WidgetComponent extends Component {
  // Specify additional Widget options as static properties
  static dependencies: Dependencies = [];

  render() {
    const name: string = 'Widget';
    return <h1>My TypeScript React Widget - {name}</h1>;
  }
}

export default WidgetComponent;
