import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import boundaries from "eslint-plugin-boundaries";

export default tseslint.config(
  { ignores: ["dist", "node_modules", ".tmp"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      jsxA11y.flatConfigs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      boundaries,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.app.json",
        },
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app/*" },
        { type: "pages", pattern: "src/pages/*" },
        { type: "widgets", pattern: "src/widgets/*" },
        { type: "features", pattern: "src/features/*" },
        { type: "entities", pattern: "src/entities/*" },
        { type: "shared", pattern: "src/shared/*" },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "app/**", group: "internal", position: "after" },
            { pattern: "pages/**", group: "internal", position: "after" },
            { pattern: "widgets/**", group: "internal", position: "after" },
            { pattern: "features/**", group: "internal", position: "after" },
            { pattern: "entities/**", group: "internal", position: "after" },
            { pattern: "shared/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          message: "{{from.type}} нельзя импортировать из {{to.type}}",
          rules: [
            {
              from: { type: "app" },
              allow: [
                {
                  to: {
                    type: [
                      "pages",
                      "widgets",
                      "features",
                      "entities",
                      "shared",
                    ],
                  },
                },
              ],
            },
            {
              from: { type: "pages" },
              allow: [
                { to: { type: ["widgets", "features", "entities", "shared"] } },
              ],
            },
            {
              from: { type: "widgets" },
              allow: [{ to: { type: ["features", "entities", "shared"] } }],
            },
            {
              from: { type: "features" },
              allow: [{ to: { type: ["entities", "shared"] } }],
            },
            {
              from: { type: "entities" },
              allow: [{ to: { type: ["shared"] } }],
            },
            { from: { type: "shared" }, allow: [{ to: { type: ["shared"] } }] },
            {
              disallow: [
                {
                  to: {
                    type: [
                      "app",
                      "pages",
                      "widgets",
                      "features",
                      "entities",
                      "shared",
                    ],
                    internalPath: "!index.{ts,tsx,js,jsx}",
                  },
                },
              ],
              message:
                "Импорт из другого слайса разрешен только через его публичное API (index.ts)",
            },
          ],
        },
      ],
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
    },
  },
  prettierConfig,
);
