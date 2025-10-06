module.exports = {
    extends: [
        "stylelint-config-standard"
    ],
    plugins: [
        "stylelint-order"
    ],
    rules: {
        "block-no-empty": true,
        "comment-empty-line-before": "always",
        "comment-whitespace-inside": "always",
        "custom-property-pattern": null,
        "selector-class-pattern": /^([a-z][a-z0-9]*)(-[a-z0-9]+)*((__([a-z][a-z0-9]*)(-[a-z0-9]+)*)?(--([a-z][a-z0-9]*)(-[a-z0-9]+)*)?)$/i,
        "no-descending-specificity": null,
        "length-zero-no-unit": null,
        "color-function-notation": null,
        "alpha-value-notation": "number"
    },
    ignoreFiles: [
        "build/*.css",
    ]
}