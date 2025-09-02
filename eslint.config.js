import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.ts"],
    ignores: ["node_modules/**", "dist/**", ".env"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2016,
        sourceType: "module",
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
      "prettier/prettier": ["error", { singleQuote: false, endOfLine: "lf" }],
      "prefer-const": "error",
      "no-console": "warn",
      "no-unused-expressions": "error",
      "no-undef": "error",
    },
  },
];
