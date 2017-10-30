const paths = require('./config/paths')

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  settings: {
    'eslint-plugin-disable': {
      paths: {
        node: ['**/app/**/*']
      }
    },

    // see https://github.com/benmosher/eslint-plugin-import/issues/352
    'import/resolver': {
      webpack: {
        config: './config/webpack.base.config.js'
      }
    },
  },
  plugins: [
    'import',
    'promise',
    'compat',
    'node',
    'react',
    'disable'
  ],
  extends: [
    'plugin:promise/recommended',
    'standard-react',
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVestion: 8,
    ecmaFeatures: {
      sourceType: 'module',
      jsx: true
    },
    allowImportExportEverywhere: true
  },
  rules: {
    'promise/always-return': 0,
    'compat/compat': 1,
    'node/no-deprecated-api': 2,
    'node/no-extraneous-require': 2,
    'node/no-unsupported-features': 2,
    'node/no-missing-require': [2, {resolvePaths: [paths.app]}],
    'import/no-unresolved': [2, {commonjs: true, amd: true}],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'max-len': 1,
    'curly': 0,
    'no-console': 1,
    'object-curly-spacing': [2, 'always'],
  }
}
