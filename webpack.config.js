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

module.exports = function(env = {}) {
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
            Table: "./src/ctrl/Table/index.ts",
            Overlays: "./src/ctrl/overlays/index.ts",
            Filters: "./src/ctrl/filters/index.ts",
            Common: "./src/ctrl/common/index.ts",
            Files: "./src/ctrl/files/index.ts",
            Utils: "./src/ctrl/utils/index.ts",
            Lib: "./src/ctrl/lib/index.ts",
            Backoffice: "./src/ctrl/backoffice/index.ts",
            Layout: "./src/ctrl/layout/index.ts",
        },

        output: {
            path: path.resolve(__dirname, "./lib"),

            filename: "Frontend.[name].js",
            library: ["Frontend", "[name]"],
            libraryTarget: "umd",
        },
        externals: dependencies.concat([
            "moment/locale/pl",
            "react-dates/lib/css/_datepicker.css",
            "react-dates/initialize",
        ]),
        module: {
            rules: [
                {
                    // Include ts, tsx, and js files.
                    test: /\.(tsx?)|(js)|(ts)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    //use: "happypack/loader?id=sass"
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: "css-loader", query: { sourceMap: true } },
                        { loader: "resolve-url-loader", query: { sourceMap: true } },
                        //'postcss-loader',
                        {
                            loader: "sass-loader",
                            query: {
                                sourceMap: true,
                                includePaths: ["node_modules"],
                            },
                        },
                    ],
                },
            ],
        },
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
                filename: "[name].css",
                chunkFilename: "[name]-[id].[hash].css",
            }),
            /*new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),*/
        ],
    };
};
