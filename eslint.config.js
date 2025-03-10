const js = require('@eslint/js');
const ts = require('typescript-eslint');
const globals = require('globals');
const prettierLinter = require('eslint-plugin-prettier');
const prettierConfigRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
    { ignores: ['**/dist'] },
    js.configs.recommended,
    prettierConfigRecommended,
    {
        languageOptions: { globals: { ...globals.node } },
        plugins: { prettierLinter },
        rules: { 'prettier/prettier': 'warn' },
    },
    {
        files: ['**/public/**/*.js'],
        languageOptions: { globals: { ...globals.browser } },
    },
    ...ts.configs.recommendedTypeChecked.map((config) => ({
        ...config,
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            ...config.languageOptions,
            parserOptions: {
                ...config.languageOptions?.parserOptions,
                project: ['**/tsconfig.json'],
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
    })),
];
