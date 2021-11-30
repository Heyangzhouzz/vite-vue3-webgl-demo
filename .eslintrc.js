module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:vue/vue3-recommended',
    './eslint-ts.js',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module',
  },
  'plugins': [
    'vue',
    '@typescript-eslint',
  ],
  'rules': {
    'vue/match-component-file-name': ['error', {
      'extensions': ['jsx', 'tsx'],
      'shouldMatchCase': false,
    }],
    'spaced-comment': 0,
  },
};
