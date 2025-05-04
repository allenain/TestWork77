module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'next',
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn'],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-key': 'warn',
        'jsx-a11y/alt-text': 'warn'
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
