const js = require('@eslint/js');
const globals = require('globals');
const prettierLinter = require('eslint-plugin-prettier');
const prettierConfigRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
    js.configs.recommended,
    prettierConfigRecommended,
    {
        languageOptions: { globals: { ...globals.node } },
        plugins: { prettierLinter },
        rules: { 'prettier/prettier': 'warn' },
    },
];
