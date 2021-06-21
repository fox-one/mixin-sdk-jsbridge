const path = require('path');
const alias = require('@rollup/plugin-alias');
const typescript = require('rollup-plugin-typescript');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');

module.exports = function (config) {
  const extensions = ['.ts', '.js'];

  config.forEach(v => {
    // just keep the reference for third-party libs
    v.external = ['peeler-js', 'base64-js', 'crypto', 'crypto-js', 'ajax-maker'];
    v.plugins.push(
      alias({
        entries: [
          { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') }
        ]
      })
    )
  });

  // umd
  config.push({
    input: 'src/index.ts',
    output: {
      file: `umd/mixin.bridge.sdk.js`,
      format: 'umd',
      name: '$MixinBridge',
      exports: 'named',
      compact: true
    },
    plugins: [
      nodeResolve({
        extensions,
        preferBuiltins: true,
        browser: true
      }),
      commonjs(),
      typescript({
        target: "es2015",
        module: "ESNext",
        lib: ["es5", "es6", "es2015", "es2016", "dom"],
        declaration: false
      }),
      babel({
        exclude: 'node_modules/**',
        plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
        babelHelpers: 'runtime',
        extensions
      }),
      json()
    ]
  });

  return config;
}
