'use strict';
const path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    client: {
      mocha: {
        opts: 'mocha.opts'
      }
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.ts': ['webpack'],
      'src/**/*[!test].ts': ['coverage']
    },


    // list of files / patterns to load in the browser
    files: [
      'src/**/*.ts'
    ],


    // list of files / patterns to exclude
    exclude: [
      '**/*.d.ts'
    ],


    mime: {
      'text/x-typescript': ['ts']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage'],


    coverageReporter: {
      type : 'lcovonly',
      dir : 'coverage/'
    },


    webpack: {
      node: { fs: 'empty' },
      mode: 'development',
      output: {
        path: './test',
        filename: '[chunkhash:8].js',
      },
      resolve: {
        alias: {
          '@utils': path.resolve(__dirname, 'src/utils')
        },
        extensions: ['.ts', '.js', '.json']
      },
      module: {
        rules: [
          {
            test: /.ts$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  compilerOptions: {
                    target: 'ES2015',
                    module: 'commonjs',
                    lib: ['es5', 'es2015', 'es2016', 'dom']
                  }
                }
              }
            ]
          }
        ]
      }
    },
      

    // web server port
    port: 9890,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome',
      // 'Safari',
      // 'Firefox',
      // 'Opera'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
