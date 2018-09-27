// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require("path");
const webpack = require("webpack");

var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
//const context = path.resolve(__dirname, "src");
module.exports = {
    devtool: "cheap-module-source-map",
    //context: context,
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        alias: {
            frontend: path.resolve(__dirname, "../"),
        },
    },
    plugins: [
        // your custom plugins
    ],

    module: {
        rules: [
            {
                test: /\.stories\.(tsx)?$/,
                loaders: [
                    {
                        loader: require.resolve("@storybook/addon-storysource/loader"),
                        options: { parser: "typescript" },
                    },
                ],
                enforce: "pre",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                //use: "happypack/loader?id=sass"
                use: [
                    "style-loader",
                    { loader: "css-loader", query: { sourceMap: true } },
                    { loader: "resolve-url-loader", query: { sourceMap: true } },
                    //'postcss-loader',
                    {
                        loader: "sass-loader",
                        query: {
                            sourceMap: true,
                            //includePaths: ["node_modules"]
                        },
                    },
                ],
            },
            {
                test: [/\.tsx/, /\.ts$/],
                loaders: [
                    {
                        loader: "awesome-typescript-loader",
                        query: {
                            configFileName: path.resolve(__dirname, "../builder/webpack/tsconfig.json"),
                            cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/awcache"),

                            useCache: true,
                            noImplicitAny: true,
                            transpileOnly: true,
                            forceIsolatedModules: true,
                            reportFiles: ["stories/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
                            useBabel: true,
                            babelCore: "@babel/core",
                            babelOptions: {
                                babelrc: false,
                                retainLines: true,
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
                                            modules: false,
                                        },
                                    ],
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
                                    "transform-react-constant-elements",
                                    "transform-react-inline-elements",
                                    "@babel/plugin-syntax-jsx",
                                    "@babel/plugin-syntax-dynamic-import",
                                    "@babel/proposal-class-properties",
                                    "@babel/proposal-object-rest-spread",
                                    "react-hot-loader/babel",
                                ],
                            },
                        },
                    },
                    {
                        loader: "react-docgen-typescript-loader",
                        options: {
                            tsconfigPath: path.resolve(__dirname, "../builder/webpack/tsconfig.json"),
                        },
                    },
                    {
                        loader: "string-replace-loader",
                        options: {
                            search: "../../../../build/js/lang/i18",
                            replace: "frontend/translations/i18n",
                            flags: "",
                        },
                    },
                ],
            },
            {
                test: [/\.js$/, /\.es6$/],
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    {
                        loader: "babel-loader",
                        options: {
                            retainLines: true,
                            exclude: /(node_modules|bower_components)/,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            LANGUAGE: "en",
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        /* new HardSourceWebpackPlugin({
            // Either an absolute path or relative to webpack's options.context.
            cacheDirectory: path.resolve(__dirname, "../node_modules/hard-source/[confighash]"),
            // Either an absolute path or relative to webpack's options.context.
            // Sets webpack's recordsPath if not already set.
            recordsPath: path.resolve(__dirname, "../node_modules/hard-source/[confighash]/records.json"),

            // Either false, a string, an object, or a project hashing function.
            environmentHash: {
                root: process.cwd(),
                directories: [],
                files: ["yarn.lock"],
            },
        }),*/
        /*new TypedocWebpackPlugin({
            name: 'Contoso',
            //mode: 'file',
            ignoreCompilerErrors: true,
            out: path.resolve(__dirname, '../docs'),
        }, path.resolve(__dirname, '../src'))*/
    ],
};
