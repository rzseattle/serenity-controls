module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "jest"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:storybook/recommended",
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
            },
        ],
        //"@typescript-eslint/no-explicit-any": "error",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "react-hooks/exhaustive-deps": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    overrides: [
        {
            files: ["**/*.test.js"],
            env: {
                jest: true,
            },
        },
    ],
};
