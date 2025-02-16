export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order"
  ],
  plugins: [
    "@stylistic/stylelint-plugin",
    "stylelint-order",
    "stylelint-declaration-block-no-ignored-properties"
  ],
  customSyntax: "postcss-scss",
  overrides: [{ files: ["**/*.svelte"], customSyntax: "postcss-html" }],
  ignoreFiles: [
    "dist/**/*css"
  ],
  rules: {
    "@stylistic/color-hex-case": "lower",
    "at-rule-no-unknown": [true, {
      ignoreAtRules: ["include", "each", "if", "else", "mixin", "extend", "function", "use", "forward"]
    }],
    "at-rule-empty-line-before": "never",
    "declaration-empty-line-before": "never",
    "rule-empty-line-before": "never",
    "selector-class-pattern": "[a-z]([a-z-]+)?(__([a-z]+-?)+)?(--([a-z]+-?)+){0,2}",
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }]
  }
};
