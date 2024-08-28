import babelParser from '@babel/eslint-parser'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    languageOptions: {
      parser: babelParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      },
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          sourceType: 'module',
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-syntax-import-assertions'],
        },
      },
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
]
