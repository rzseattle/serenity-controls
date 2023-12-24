module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: 3,
                modules: "commonjs",
                loose: false,
            },
        ],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    plugins: [
        ["@babel/plugin-proposal-class-properties", { loose: false }],
        ["@babel/plugin-transform-class-properties", { loose: false }],

        ["@babel/plugin-transform-private-property-in-object", { loose: false }],
        ["@babel/plugin-transform-modules-commonjs"],
    ],
};
