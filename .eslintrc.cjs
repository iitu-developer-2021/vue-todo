module.exports = {
    root: true,
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    extends: [
        "plugin:vue/strongly-recommended",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "prettier",
    ],
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "vue/no-multiple-template-root": "off",
        "vue/no-v-for-template-key": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "vue/no-v-model-argument": "off"
    },
}
