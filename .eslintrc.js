module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // 'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    // 'react/jsx-filename-extension': [
    //   2,
    //   { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    // ],
    'prettier/prettier': ['error'],
    'no-console': 'off',
  },
};
