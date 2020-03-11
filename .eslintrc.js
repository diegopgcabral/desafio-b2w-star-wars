module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    'no-undef': 'off',
    "no-param-reassign": "off",
    'no-unused-vars': 'off',
    "camelcase": "off",
    "no-await-in-loop": "off",
    "no-restricted-syntax": "off",
    "no-unused-vars": ["error", {"argsIgnorePattern": "next"}],
  },
};
