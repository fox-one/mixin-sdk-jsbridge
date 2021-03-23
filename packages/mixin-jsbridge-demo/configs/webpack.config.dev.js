'use strict';

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  cache: {
    type: 'filesystem'
  },
  devtool: false,
  // devtool: 'cheap-module-eval-source-map',
  optimization: {
    minimize: false,
  },
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, '../src/index.ts')
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../src'),
    publicPath: '/'
  },
  module: {
    rules: [
      
      {
        test: /.(css|less)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } },
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          },
          {
            use: [
              'style-loader',
              'css-loader',
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          }
        ]
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'mixin-jsbridge-demo',
      path: path.resolve(__dirname, '../src'),
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
});
