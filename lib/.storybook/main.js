const path = require('path');

// your app's webpack.config.js
const custom = require('../webpack.config.js');

module.exports = {
  stories: ['./stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],

  webpackFinal: (config) => {
    config.resolve.alias['@tecnojest/widget-base'] = path.resolve(__dirname, '../../lib/index');
    return { ...config, module: { ...config.module, rules: custom[0].module.rules } };
  },
};
