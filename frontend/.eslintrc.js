module.exports = {
    env: {
        "browser": true,
        "es2021": true
    },
    extends: [
        // "eslint:recommended",
        "eslint-config-standard",
        "plugin:promise/recommended",
        "plugin:import/recommended",
    ],
    overrides: [
    ],
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        },
    },
    plugins: [
        "eslint-plugin-promise",
        "eslint-plugin-import"
    ],
    ignorePatterns: [
            "*.config.js",
            "build/*.js",
            ".*rc.js"
        ],
    rules: {
        "indent": ["error", "tab"],
        "no-tabs": 0,
        "new-cap":  0,
        "no-template-curly-in-string": 0,
        "no-unused-vars": 0,
        "no-undef": 0,
        "promise/always-return": 0,
        "array-callback-return": 0
    }
}
