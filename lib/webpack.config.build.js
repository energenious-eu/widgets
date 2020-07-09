const path = require('path');

const increaseSpecificity = require('postcss-increase-specificity');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'src',
        to: '.',
        ignore: ['*.tsx'],
      },
      // {from:"package.json", to: "package.json"},
      // {from:"webpack.config.js", to: "webpack.config.js"},
      // {from:".eslintrc", to: "."}
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: [/node_modules/, /vendor/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript', '@babel/env', 'airbnb'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-json-strings',
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true,
                },
              ],
              '@babel/plugin-proposal-function-sent',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-numeric-separator',
              '@babel/plugin-proposal-throw-expressions',
            ],
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /vendor/],
        loader: 'source-map-loader',
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          configFile: path.join(__dirname, '.eslintrc'),
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'cssimportant-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: [
          //       increaseSpecificity({
          //         // stackableRoot: '.cleanslate',
          //         repeat: 1,
          //       }),
          //     ]
          //   },
          // },
          'sass-loader',
        ],
      },
    ],
  },
  externals: {
    React: 'react',
    ReactDOM: 'react-dom',
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
  },
};
