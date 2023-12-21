module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: 3,
                modules: "commonjs",
                loose: true,
            },
        ],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    plugins: [
        ["@babel/plugin-proposal-class-properties", { loose: false }],
        ["@babel/plugin-proposal-private-methods", { loose: false }],

        ["@babel/plugin-proposal-private-property-in-object", { loose: false }],
        ["@babel/plugin-transform-modules-commonjs"],
    ],
};
