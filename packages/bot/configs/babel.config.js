'use strict';

module.exports = function (api) {
  api.cache(false);
  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
    '@babel/preset-typescript'
  ];

  const plugins = [];

  return {
    presets,
    plugins
  };
};
