import { configure } from '@storybook/react';
const path = require('path');

// automatically import all files ending in *.stories.js
const req = require.context(path.join(process.cwd(),'stories'), true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
