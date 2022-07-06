/* eslint-env node */
module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true,
    "cypress/globals": true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2020,
    'sourceType': 'module'
  },
  'plugins': [
    "react", "jest", "cypress"
  ],
  'rules': {
    'eqeqeq': 'error',
    'no-console': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    "no-unused-vars": "warn"
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}