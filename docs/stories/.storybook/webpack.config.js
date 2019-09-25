const path = require("path");
const fs = require("fs");

module.exports = async ({ config, mode }) => {
    config.resolve.extensions.push(".ts");
    config.resolve.extensions.push(".tsx");

    config.resolve.alias.frontend = path.resolve(__dirname, "../");

    config.module.rules.push({
        test: /\.(sa|sc)ss$/,
        use: [
            "style-loader",
            { loader: "css-loader", query: { sourceMap: true } },
            { loader: "resolve-url-loader", query: { sourceMap: true } },
            //'postcss-loader',
            {
                loader: "sass-loader",
                query: {
                    sourceMap: true,
                    sassOptions: { includePaths: ["node_modules"] },
                },
            },
        ],
    });

    config.module.rules.push({
        test: /\.stories\.(tsx)?$/,
        loaders: [
            {
                loader: require.resolve("@storybook/addon-storysource/loader"),
                options: { parser: "typescript" },
            },
        ],
        enforce: "pre",
    });

    config.module.rules.push({
        test: [/\.tsx/, /\.ts$/],
        loaders: [
            {
                loader: "babel-loader",
                options: {

                    retainLines: true,

                    babelrc: false,
                    retainLines: true,
                    exclude: /(node_modules|bower_components)/,
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: [
                                        "last 1 Chrome versions",
                                        "last 1 Firefox versions",
                                        "last 1 Edge versions",
                                    ],
                                    node: "current",
                                },
                                useBuiltIns: "entry",
                                corejs: "3",
                                modules: false,
                            },
                        ],
                        "@babel/preset-typescript",
                        "@babel/react",
                    ],

                    plugins: [
                        /*[
                              "react-css-modules",
                              {
                                  context,
                                  filetypes: {
                                      ".sass": {
                                          syntax: "postcss-sass",
                                      },
                                  },
                                  webpackHotModuleReloading: true,
                                  handleMissingStyleName: "throw",
                              },
                          ],*/

                        "@babel/plugin-syntax-jsx",
                        "@babel/plugin-syntax-dynamic-import",

                        ["@babel/proposal-class-properties", { loose: true }],
                        "@babel/proposal-object-rest-spread",
                        "react-hot-loader/babel",
                    ],
                },
            },
            {
                loader: "react-docgen-typescript-loader",
                options: {
                    tsconfigPath: path.resolve(__dirname, "../../../builder/webpack/tsconfig.json"),
                },
            },
        ],
    });

    return config;
};
