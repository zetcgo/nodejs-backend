const js = require('@eslint/js');
const globals = require('globals');
const prettierLinter = require('eslint-plugin-prettier');
const prettierConfigRecommended = require('eslint-plugin-prettier/recommended');
const pugLinter = require('eslint-plugin-pug');

module.exports = [
    js.configs.recommended,
    prettierConfigRecommended,
    {
        languageOptions: { globals: { ...globals.node } },
        plugins: { prettierLinter, pugLinter },
        rules: { 'prettier/prettier': 'warn' },
    },
];
