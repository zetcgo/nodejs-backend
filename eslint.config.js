const js = require('@eslint/js');
const globals = require('globals');
const prettierPlugin = require('eslint-plugin-prettier');
const pugPlugin = require('eslint-plugin-pug');

module.exports = [
    js.configs.recommended,
    {
        languageOptions: { globals: { ...globals.node } },
        plugins: { prettierPlugin, pugPlugin },
    },
    {
        files: ['**/src/public/**/*.js'],
        languageOptions: { globals: { ...globals.browser } },
    },
];
