module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'prettier', '@typescript-eslint', 'simple-import-sort'],
  extends: ['prettier', 'airbnb-typescript', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'import/extensions': 'off',
    'import/first': 'off',
    'import/newline-after-import': 'off',
    'import/no-cycle': 'off',
    'import/no-duplicates': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react|lodash'],
          ['^@?\\w'],
          ['^@/lib(/.*|$)'],
          ['^@/assets(/.*|$)'],
          ['^@(/.*|$)'],
          ['^\\u0000'], // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'sort-imports': 'off',
    'no-plusplus': 'off',
    'no-alert': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },
};
