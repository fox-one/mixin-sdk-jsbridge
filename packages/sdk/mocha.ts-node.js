require('ts-node').register({
  compilerOptions: {
    module: 'commonjs'
  },
  ignore: [/node_modules\/(?!(ajax\-maker)|(peeler\-js))\S*/]
});
