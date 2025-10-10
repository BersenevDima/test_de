export default [
  {
    files: [ "*.js" ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
      },
    },
    ignores: [
      "*.config.js",
      "build/*.js",
      ".*rc.js",
    ],
    rules: {
      indent: [ "error", "tab" ],
      "no-tabs": "off",
      "new-cap": "off",
      "no-template-curly-in-string": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "promise/always-return": "off",
      "array-callback-return": "off",
    },
    extends: [
      "standard",
      "plugin:promise/recommended",
      "plugin:import/recommended",
    ],
  },
];
