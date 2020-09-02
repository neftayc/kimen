module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-empty': 1,
    'no-console': 1,
    eqeqeq: 2,
    'no-alert': 2,
    'no-multi-spaces': 2,
    camelcase: 2,
    'comma-dangle': 2,
    indent: 2,
    'key-spacing': 2,
    'max-len': [
      1,
      {
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
        code: 100
      }
    ],
    'max-lines': ['error', { skipComments: true, max: 1500 }],
    'max-lines-per-function': ['error', 200],
    'no-trailing-spaces': 2,
    'no-underscore-dangle': 2,
    quotes: [2, 'single'],
    'no-duplicate-imports': 2,
    'no-var': 2
  }
}
