var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const increaseSpecificity = require('postcss-increase-specificity');
var DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
// const JavaScriptObfuscator = require('webpack-obfuscator');
const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// how to use html plugin: https://javascriptplayground.com/webpack-html-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const devMode = process.argv[process.argv.indexOf('--mode') + 1] !== 'production';
const publicDir = path.join(process.cwd(), 'public');
const distDir = path.join(process.cwd(), 'dist');

const resolveFolder = fs.existsSync(path.join(__dirname, 'src'))
  ? path.join(__dirname, 'src')
  : path.join(__dirname, 'lib');

const { parseClassName } = require(path.join(resolveFolder, 'util', 'parsers.js'));

const title = process.env.WIDGET_TITLE || require(path.join(process.cwd(), 'package.json')).name;
const mainCssClass = parseClassName(process.env.WIDGET_MAIN_CSS_CLASS || title);
const hideExplanation = !!process.env.WIDGET_HIDE_EXPLANATION;
const staticAssetDistributionServer = process.env.WIDGET_ASSET_SERVER
  ? process.env.WIDGET_ASSET_SERVER
  : '/';

/////////////// HERE OPTIONS BASED ON CONDITIONAL VARIABLES ARE DEFINED
const host = require('./webpack.util.js').getWidgetAssetServer();

var extra_post_css_loaders = [];
var extra_plugins = [];
var extra_rules = [];
var excluded_css_files = []; //[/\.cleanslate-strong\.css$/];

// GLOBALS are pseudo-env vars available at runtime, don't use it in the plugin
var GLOBALS = {
  'process.CWD': JSON.stringify(path.join(process.cwd())),
  'process.env.WIDGET_MAIN_CSS_CLASS': JSON.stringify(mainCssClass),
  // "process.env.WIDGET_TITLE": JSON.stringify(title),
  'process.env.WIDGET_ASSET_SERVER': JSON.stringify(host),
};

if (process.env.WIDGET_USE_CLEANSLATE) {
  extra_post_css_loaders.push('cssimportant-loader');
  // excluded_css_files.splice(excluded_css_files.indexOf("cleanslate-strong.css"),1);
  GLOBALS['process.env.WIDGET_USE_CLEANSLATE'] = JSON.stringify(process.env.WIDGET_USE_CLEANSLATE);
}

if (!devMode && !process.env.WIDGET_UNCOMPRESSED) {
  extra_plugins = extra_plugins.concat(
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 0, //8192,
      minRatio: 0.8,
    })
  );
}
////////////////////////

const babelPlugins = [
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
];

const defaultConfig = {
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    contentBase: publicDir,
    host: host === '.' ? 'localhost' : host, //process.env.WIDGET_ASSET_SERVER || "localhost",
    https: host && host.startsWith('https://'),
    disableHostCheck: true,
    port: process.env.PORT || 80,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new WebpackShellPlugin({
      onBuildStart: ['echo "Webpack Start"'],
      onBuildEnd: ['echo "Webpack End"'],
    }),
    // new CleanWebpackPlugin({protectWebpackAssets: false}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    // devMode ? null : new JavaScriptObfuscator(),
    new HtmlWebpackPlugin({
      // template: './public/blank.html',
      template: path.join(resolveFolder, 'index.ejs'),
      // filename: './blank.html',
      // inject: 'body',
      reject: true,
      inject: false,
      title: title,
      display: hideExplanation ? 'none' : 'inherit',

      script_name: title[0].toLowerCase() + title.substr(1),
      // port: process.env.PORT
    }),
    new webpack.DefinePlugin(GLOBALS),
    new Dotenv({
      path: path.join(process.cwd(), '.env'), // Path to .env file (this is the default)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
  ]
    .concat(extra_plugins)
    .filter((i) => i),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /vendor/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/typescript', '@babel/env', 'airbnb'],
              plugins: babelPlugins,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /vendor/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['airbnb'],
            plugins: babelPlugins,
            sourceType: 'unambiguous',
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /vendor/],
        loader: 'source-map-loader',
      },
      // {
      //   test: process.env.WIDGET_ENABLE_ESLINT ? /\.js$/ : () => false,
      //   exclude: [/node_modules/,/vendor/,/public/],
      //   loader: 'eslint-loader',
      //   options: {
      //     emitWarning: true,
      //     configFile: path.join(__dirname, '.eslintrc')
      //   },
      // },
      {
        test: /\.(scss|css)$/,
        exclude: excluded_css_files,
        use: [
          // fallback to style-loader in development
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          // https://www.npmjs.com/package/cssimportant-loader
          // readmore about cleanslate: http://cleanslatecss.com/
          // 'cssimportant-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // https://github.com/MadLittleMods/postcss-increase-specificity
                increaseSpecificity({
                  stackableRoot: '.' + mainCssClass,
                  repeat: 1,
                  // overrideIds: false,
                }),
              ],
              sourceMap: devMode,
            },
          },
          'sass-loader',
        ].concat(extra_post_css_loaders),
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      // {
      //    test: /\.(png|svg|jpg|gif|wav)$/,
      //    use: [{
      //      loader: 'file-loader',
      //      options: {
      //         name: '[path]-[name].[ext]'
      //       }
      //    }],
      //  },
      // {
      //   test: /\.(js|jsx)$/,
      //   loader: 'file-loader',
      //   include: ['/asset/','/src/asset'],
      //   // exclude: [/node_modules/],//,/vendor/,/public/,/src/],
      //   options: {
      //     name: '[name].[ext]',
      //     outputPath:"something",
      //     publicPath: 'js2',
      //     emitFile: true,
      //   },
      // },
      // {
      //   test: /\.js$/i,
      //   include: [/public/],
      //   exclude: [/node_modules/,/vendor/],
      //   use: {
      //     loader: 'raw-loader',
      //     options: {
      //       esModule: true
      //     }
      //   }
      // },
    ].concat(extra_rules),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    // https://medium.com/@penx/managing-dependencies-in-a-node-package-so-that-they-are-compatible-with-npm-link-61befa5aaca7
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      // https://github.com/reduxjs/react-redux/issues/1489
      'react-redux': path.resolve('./node_modules/react-redux'),
    },
  },
};

function fsExistsSync(myDir) {
  try {
    fs.accessSync(myDir);
    return true;
  } catch (e) {
    return false;
  }
}

function getEntry() {
  const directory = 'src';
  const filename = 'index';

  const getPath = (extension) => path.join(process.cwd(), `${directory}/${filename}.${extension}`);

  let index = getPath('js');

  if (fsExistsSync(getPath('tsx'))) {
    index = getPath('tsx');
  } else if (fsExistsSync(getPath('jsx'))) {
    index = getPath('jsx');
  } else if (fsExistsSync(getPath('js'))) {
    index = getPath('js');
  }

  return { index };
}

module.exports = [
  {
    ...defaultConfig,
    entry: getEntry(),
    output: {
      path: distDir,
      // https://stackoverflow.com/questions/31191884/set-up-webpack-to-run-locally-on-a-custom-domain-over-https
      publicPath: staticAssetDistributionServer,
      filename: ({ chunk }) =>
        chunk.name == 'index'
          ? title[0].toLowerCase() + title.substr(1) + '.js'
          : chunk.name + '.js',
      library: title + '_Widget',
      libraryExport: 'default',
      libraryTarget: 'window',
    },
    // optimization: {
    //    splitChunks: {
    //      chunks: 'all',
    //    },
    //  },
    optimization: {
      // minimizer: [new UglifyJsPlugin()],
    },
  },
];
