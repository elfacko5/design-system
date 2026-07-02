// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist/**', 'storybook-static/**', 'node_modules/**', 'coverage/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // New JSX transform — no need for `import React` in every file.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // TypeScript covers this
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Components in this library intentionally type most style-affecting
      // props as string unions (e.g. `variant`) rather than `any`.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    // Story and test files commonly use patterns (render props returning
    // JSX literals, loose args typing) that don't need the same rigor.
    files: ['**/*.stories.tsx', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // Root-level Node build/config scripts (sd.config.js, this file, etc.)
    // run under Node, not the browser — they need Node globals like
    // `console` and `process` rather than jsdom/browser ones.
    files: ['*.config.js', '*.config.ts'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
  prettierConfig,
);
