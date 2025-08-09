const path = require('path');
const { env } = require('process');

module.exports = {
  env: {
    node: true,
    es6: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    semi: 'off',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    'no-console': 'warn',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-underscore-dangle': 'off',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Domain層が依存してはいけない領域
          {
            from: './src/Application/**/*',
            target: './src/Domain/**/!(*.spec.ts|*.test.ts)',
            message: 'Domain 層で Application 層を import してはいけません。',
          },
          {
            from: './src/Presentation/**/*',
            target: './src/Domain/**/!(*.spec.ts|*.test.ts)',
            message: 'Domain 層で Presentation 層を import してはいけません。',
          },
          {
            from: './src/Infrastructure/**/*!(test).ts',
            target: './src/Domain/**/!(*.spec.ts|*.test.ts)',
            message:
              'Domain 層で Infrastructure 層を import してはいけません。',
          },
          // Application層が依存してはいけない領域
          {
            from: './src/Presentation/**/*',
            target: './src/Application/**/!(*.spec.ts|*.test.ts)',
            message:
              'Application 層で Presentation 層を import してはいけません。',
          },
          {
            from: './src/Infrastructure/**/*',
            target: './src/Application/**/!(*.spec.ts|*.test.ts)',
            message:
              'Application 層で Infrastructure 層を import してはいけません。',
          },
        ],
      },
    ],
  },
  // import/no-restricted-paths のために必要
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
