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

const dependencies = Object.keys(require("./package").dependencies);

module.exports = function (env = {}) {
    return {
        mode: "production",
        devtool: "source-maps",
        resolve: {
            extensions: [".js", ".json", ".css", ".ts", ".tsx"],
            modules: [__dirname, "node_modules"],
            alias: {
                frontend: path.resolve(__dirname, "./"),
            },
        },

        entry: {
            table: "./src/ctrl/Table/index.ts",
            overlays: "./src/ctrl/overlays/index.ts",
            filters: "./src/ctrl/filters/index.ts"
        },

        output: {
            filename: `[name].js`,
            chunkFilename: '[name]-[id].[hash:8].js',
            path: path.resolve(__dirname, "./lib"),
            publicPath: "",
        },
        externals: dependencies,
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
                        discardComments: {removeAll: true},
                        zindex: false,
                    },
                }),
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name]-[hash].css",
                chunkFilename: "[name]-[id].[hash].css",
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
        ],
    };
};
