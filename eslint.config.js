import process from "node:process";
import antfu from "@antfu/eslint-config";

const SORT_IMPORT_CUSTOM_GROUP = {
  "svelte": "^svelte$",
  "svelte-components": "\\.svelte$"
};

export default antfu({
  toml: false,
  svelte: true,
  isInEditor: false,
  ignores: ["**/*.json"],
  rules: {
    "antfu/consistent-list-newline": "off",
    "antfu/if-newline": "off",
    "curly": ["error", "multi-line"],
    "import/consistent-type-specifier-style": "off",
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    "max-lines": ["warn", { max: 1000 }],
    "max-params": ["error", { max: 6 }],
    "no-await-in-loop": "error",
    "no-console": [process.env.NODE_ENV === "production" ? "error" : "warn", {
      allow: ["table", "info", "warn", "error"]
    }],
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "no-restricted-globals": ["error",
      { name: "global", message: "Use `globalThis` instead." },
      { name: "self", message: "Use `globalThis` instead." },
      { name: "location", message: "Use `window.location` instead." },
      { name: "close", message: "Use `window.close` instead." }
    ],
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-useless-concat": "error",
    "no-void": "error",
    "perfectionist/sort-named-imports": ["error", {
      order: "asc",
      type: "natural",
      groupKind: "values-first"
    }],
    "perfectionist/sort-imports": ["error", {
      internalPattern: ["^@/"],
      groups: [
        "builtin",
        "svelte",
        "external",
        "type",
        "internal",
        ["parent", "sibling", "index"],
        "internal-type",
        ["parent-type", "sibling-type", "index-type"],
        "side-effect",
        "svelte-components",
        "object",
        "unknown"
      ],
      customGroups: {
        value: SORT_IMPORT_CUSTOM_GROUP,
        type: SORT_IMPORT_CUSTOM_GROUP
      },
      newlinesBetween: "ignore",
      order: "asc",
      type: "natural"
    }],
    "prefer-destructuring": ["error", { array: true, object: true }],
    "require-await": "warn",
    "style/arrow-parens": ["error", "always"],
    "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "style/comma-dangle": ["error", "never"],
    "style/indent": ["error", 2, {
      ArrayExpression: 1,
      CallExpression: { arguments: 1 },
      flatTernaryExpressions: false,
      FunctionDeclaration: { body: 1, parameters: 1 },
      FunctionExpression: { body: 1, parameters: 1 },
      ignoreComments: false,
      ignoredNodes: [
        "TSUnionType",
        "TSIntersectionType",
        "TSTypeParameterInstantiation",
        "FunctionExpression > .params[decorators.length > 0]",
        "FunctionExpression > .params > :matches(Decorator, :not(:first-child))"
      ],
      ImportDeclaration: 1,
      MemberExpression: 1,
      ObjectExpression: 1,
      offsetTernaryExpressions: false,
      outerIIFEBody: 1,
      SwitchCase: 1,
      tabLength: 2,
      VariableDeclarator: 1
    }],
    "style/lines-between-class-members": "off",
    "style/max-statements-per-line": "off",
    "style/operator-linebreak": ["error", "after"],
    "style/quotes": ["error", "double"],
    "style/semi": ["error", "always"],
    "svelte/html-quotes": ["error", { prefer: "double" }],
    "ts/array-type": "error",
    "ts/consistent-indexed-object-style": "error",
    "ts/consistent-type-definitions": "off",
    "ts/member-ordering": ["error", { default: { optionalityOrder: "required-first" } }],
    "ts/no-shadow": "error",
    "unicorn/prefer-includes": "off",
    "yaml/quotes": ["error", { prefer: "double" }]
  }
}, {
  name: "svelte/ignores",
  files: ["**/*.svelte"],
  rules: {
    "prefer-const": "off"
  }
});
