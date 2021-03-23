'use strict';

module.exports = {
  env: {
    'browser': true,
    'es6': true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/indent': ['warn', 2],
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/restrict-plus-operands': ['warn'],
    '@typescript-eslint/array-type': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/no-angle-bracket-type-assertion': ['off'],
    '@typescript-eslint/interface-name-prefix': ['off'],
    '@typescript-eslint/explicit-member-accessibility': ['warn'],
    '@typescript-eslint/consistent-type-assertions': ['warn'],
    '@typescript-eslint/no-inferrable-types': ['warn'],
    'no-console': ['error', { 'allow': ['warn', 'error', 'info'] }],
    'semi': ['error', 'always'],
    'prefer-spread': ['warn'],
    'no-unused-vars': ['off'],
    'no-extra-semi': ['warn'],
    'quotes': ['error', 'single'],
    'linebreak-style': ['warn', 'unix'],
    'prettier/prettier': [
      'warn',
      {
        'printWidth': 50,
        'tabWidth': 2,
        'singleQuote': true,
        'jsxSingleQuote': true,
        'semi': true,
        'trailingComma': 'none',
        'endOfLine': 'auto',
        'arrowParens': 'avoid',
        'rangeEnd': 0
      }
    ]
  }
};
