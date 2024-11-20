import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends("eslint-config-next", "next/core-web-vitals"),
  {
    rules: {
      "react/jsx-sort-props": "warn",
      "prefer-const": "error",

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "object",
            "type",
            "index",
          ],

          pathGroups: [
            {
              pattern: "{react,react-dom/**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "@components/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@lib/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@styles/**",
              group: "external",
              position: "after",
            },
          ],

          distinctGroup: true,
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default config;
