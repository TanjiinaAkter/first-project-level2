const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ["src/**/*.ts"],
    ignores: ["node_modules/**", "dist/**", ".env"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module", // CommonJS হলেও Node.js import/export ঠিকঠাক কাজ করবে
      },
      globals: {
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      "prefer-const": "error",
      "no-console": "warn",
      "no-unused-expressions": "error",
      "no-undef": "off", // TS already checks undefined vars
    },
  },
];
