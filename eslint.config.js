import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        languageOptions: { globals: { ...globals.node } },
        plugins: { prettier: prettierPlugin },
    },
];
