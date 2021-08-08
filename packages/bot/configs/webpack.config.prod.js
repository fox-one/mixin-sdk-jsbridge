'use strict';

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin')
  .default;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require(path.resolve(
  __dirname,
  'webpack.config.common.js'
));
const { build } = require(path.resolve(__dirname, 'omni.config.js'));
const {
  srcDir = path.resolve(__dirname, '../src/'),
  outDir = path.resolve(__dirname, '../lib/'),
  hash
} = build || {};
const publicPath = '';

module.exports = merge(commonConfig, {
  // 需要 source-map 请开启
  // Remove annotation when need source-map
  // devtool: 'cheap-module-source-map',
  cache: {
    type: 'memory'
  },
  output: {
    publicPath
  },
  module: {
    rules: [
      
      {
        test: /.(css|less)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              { loader: MiniCssExtractPlugin.loader, options: { publicPath } },
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } },
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          },
          {
            use: [
              { loader: MiniCssExtractPlugin.loader, options: { publicPath } },
              'css-loader',
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          }
        ]
      }

    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          reduceIndents: false,
          autoprefixer: false
        }
      })
    ],
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        polyfill: {
          chunks: 'all',
          test: /(core-js|regenerator-runtime)/,
          enforce: true,
          name: 'polyfill',
          priority: 110
        },
        flexible: {
          chunks: 'all',
          test: /amfe-flexible/,
          enforce: true,
          name: 'flexible',
          priority: 105
        },
        vendors: {
          chunks: 'all',
          test: /(vue|vue-router|vuex|mobx|mobx-vue)/,
          enforce: true,
          name: 'vendors',
          priority: 100
        },
        commons: {
          chunks: 'all',
          test: /(axios)/,
          enforce: true,
          name: 'chunk',
          priority: 90
        },
        asyncs: {
          chunks: 'async',
          enforce: true,
          name: 'chunk.async',
          priority: 80
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
    }),
    
    new MiniCssExtractPlugin({
      filename: hash ? `[name].[${typeof hash === 'string' ? hash : 'contenthash'}:8].css` : '[name].css'
    }),
    
    // ! 需要分析打包时，请打开注释
    // Remove annotation when need analyze package
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   defaultSizes: 'parsed',
    //   reportFilename: './bundle_analysis.html'
    // }),

    new HtmlWebpackPlugin({
      path: path.resolve(outDir),
      template: path.resolve(srcDir, 'index.html'),
      minify:{
        removeComments: true,
        collapseWhitespace: true
      },
      // filename: hash ? 'index.[hash:8].html' : 'index.html',
      // hash: !!hash,
      filename: 'index.html'
    }),

    // 走统一 CDN 的静态资源
    // The static resources of CDN
    // 能一定程度上减少资源加载时长和构建时长
    // It can reduce some download source and construction time
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'vue',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.7/vue.cjs.prod.min.js',
    //       global: 'Vue'
    //     }
    //     {
    //       module: 'vue-router',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.0.4/vue-router.cjs.prod.min.js',
    //       global: 'VueRouter'
    //     }
    //   ]
    // }),
    // 将同步的外链 link 注入到 html 中
    // Inject the outer-links into html-style tag
    //! 能一定程度上减少首屏时长
    // It can reduce some first-screen time
    new HTMLInlineCSSWebpackPlugin({
      filter(fileName) {
        //! 注意，若是更改了 splitChunks异步加载 的配置
        // Note that if you change the configuration of splitChunks
        //! 需要过滤掉异步的css文件，否则会导致页面白屏！！！
        // You need to filter out asynchronous CSS files, otherwise the page will be white!!!
        return !fileName.includes('async');
      }
    })
    
  ],
  mode: 'production'
});
