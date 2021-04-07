'use strict';

const path = require('path');
const WebpackBar = require('webpackbar');
const { VueLoaderPlugin } = require('vue-loader');

const cliConfig = require(path.resolve(__dirname, 'omni.config.js'));
const hash = cliConfig && cliConfig.build && cliConfig.build.hash;


module.exports = {
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, 'babel.config.js')
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: hash ? `assets/[name].[${typeof hash === 'string' ? hash : 'contenthash'}:8].[ext]` : 'assets/[name].[ext]'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar({
      name: '[OMNI-DOOR]:'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@components': path.resolve(__dirname, '../src/components')
    },
    extensions: ['.vue', '.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
    fallback: { "crypto": false }
  }
};
