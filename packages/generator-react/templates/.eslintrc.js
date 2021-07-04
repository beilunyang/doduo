const path = require('path');

module.exports = {
  env: {
    browser: true
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/destructuring-assignment': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'react/sort-comp': 0,
    'react/jsx-no-duplicate-props': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-param-reassign': 0,
    'no-debugger': 0,
    'no-shadow': 0,
    'no-console': 0
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve('src')]],
        extensions: ['.js', '.jsx', '.json']
      }
    }
  },
  root: true
};
