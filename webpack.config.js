const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const GetLoaders = require("./builder/webpack/Loaders.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const config = {
    PRODUCTION: true,
    DOMAIN: "https://127.0.0.1/as/crm7",
    BASE_PATH: path.resolve(__dirname, "./"),
    PUBLIC_PATH: "/assets/dist/",
    BROWSERS: ["last 1 Chrome versions", "last 1 Firefox versions", "last 1 Edge versions"],
    LOCAL_TS_CONFIG: true,
    NODE_CACHE_DIR: path.resolve(__dirname, "./node_modules/.cache"),
};

module.exports = function(env = {}) {
    return {
        mode: "production",
        resolve: {
            extensions: [".js", ".json", ".css", ".ts", ".tsx"],
            modules: [__dirname, "node_modules"],
            alias: {
                frontend: path.resolve(__dirname, "./"),
            },
        },

        entry: ["./src/index.js"],
        output: {
            filename: `./index.min.js`,
            chunkFilename: `chunk-[name]-[hash].bundle.js`,
            path: path.resolve(__dirname, "./lib"),
            publicPath: "",
        },
        module: GetLoaders(true, config),
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false, // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        "postcss-safe-parser": true,
                        discardComments: { removeAll: true },
                        zindex: false,
                    },
                }),
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "bundle-[hash].css",
                chunkFilename: "[id].[hash].css",
            }),
        ],
    };
};
