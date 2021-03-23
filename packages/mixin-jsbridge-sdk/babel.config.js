'use strict';

module.exports = function (api) {
  api.cache(false);
  const presets = [
    '@babel/preset-env',
    '@babel/preset-typescript'
  ];

  const plugins = [];

  return {
    presets,
    plugins
  };
};
