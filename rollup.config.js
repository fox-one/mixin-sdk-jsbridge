const path = require('path');
const alias = require('@rollup/plugin-alias');

module.exports = function (config) {
  config.forEach(v => {
    v.plugins.push(
      alias({
        entries: [
          { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') }
        ]
      })
    )
  })
  return config;
}
