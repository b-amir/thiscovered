module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],

      rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        // double quotes are allowed in jsx
        'jsx-quotes': ['error', 'prefer-double'],
        // allow double quotes everywhere
        quotes: ['error', 'double'],
        // allow semicolons everywhere
        semi: ['error', 'always'],
        '@typescript-eslint/quotes': ['error', 'double'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/indent': ['off', 4],
        '@typescript-eslint/member-delimiter-style': ['off'],
        '@typescript-eslint/space-before-function-paren': ['off'],
        'react/jsx-no-comment-textnodes': ['off'],
        '@typescript-eslint/strict-boolean-expressions': 0
      },

      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      },
      plugins: [
        'react'
      ]
    }
  ]
}
