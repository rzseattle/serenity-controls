const webpack = require("webpack");
var { resolve, basename } = require("path");
const fs = require("fs");
const path = require("path");

//var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const { CheckerPlugin } = require("awesome-typescript-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractor = require("./RouteExtractor.js");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

//require("babel-polyfill");

let configDefaults = {
    HTTPS: false,
    ANALYZE: false,
    PORT: 3000,
    USE_FRAMEWORK_OBSERVERS: true,
    LANGUAGE: "pl",
    BROWSERS: null,
    NODE_CACHE_DIR: "node_modules/.cache",
    SSR: false,
};

module.exports = function(input) {
    const GetLoaders = require("./Loaders.js");

    input = Object.assign(configDefaults, input);

    let alias = {
        path: "",
    };
    if (input.PRODUCTION && !input.SSR) {
        process.env.NODE_ENV = "production";
    } else {
        process.env.NODE_ENV = "development";
        alias = {
            "react-dom": "@hot-loader/react-dom",
            path: "",
        };
    }

    if (input.BROWSERS == null) {
        input.BROWSERS = ["last 2 Chrome versions"].concat([]);
    }

    var conf = {
        target: "web",
        context: resolve(__dirname, ""),
        devtool: input.PRODUCTION ? "none" : "eval-cheap-module-source-map", //,
        // devtool: false,

        resolve: {
            extensions: [".js", ".ts", ".tsx"],
            unsafeCache: true,
            modules: ["node_modules"],
            alias,
        },
    };

    conf.module = GetLoaders(input.PRODUCTION, input);

    let tmpEntry = {};
    for (let i in input.ENTRY_POINTS) {
        tmpEntry[i] = [ "babel-polyfill", input.ENTRY_POINTS[i]];
    }

    let tmp;
    let fileComponent = resolve(input.BASE_PATH, "./build/js/tmp/components-route.include.js");
    let fileSass = resolve(input.BASE_PATH, "./build/js/tmp/components.include.sass");

    if (!input.PRODUCTION) {
        conf.mode = "development";
        if (input.USE_FRAMEWORK_OBSERVERS) {
            const FileObserver = require("./FileObserver.js");
            console.log(input.routeExtractor);
            FileObserver(input.routeExtractor, input.BASE_PATH, fileComponent, fileSass);
        }

        const getDevServerConf = require("./DevServer.js");
        tmp = getDevServerConf(
            tmpEntry,
            input.PUBLIC_PATH,
            resolve(input.BASE_PATH, input.PUBLIC_PATH),
            input.BASE_PATH,
            input.HTTPS,
            input.PORT || 3000,
            input.DOMAIN,
            input.LANGUAGE,
            webpack,
        );
    } else {
        conf.mode = "production";

        extractor(input.routeExtractor, input.BASE_PATH, fileComponent, fileSass, true);

        const getProductionConf = require("./Production.js");
        tmp = getProductionConf(
            tmpEntry,
            input.PUBLIC_PATH,
            input.PATH,
            input.BASE_PATH,
            input.LANGUAGE,
            input.ANALYZE,
            webpack,
        );
    }

    for (let i in tmp) {
        conf[i] = tmp[i];
    }

    conf.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/(.*)\.sass/, function(resource) {
            if (resource.contextInfo && resource.contextInfo.issuer.match(/frontend\/lib/)) {
                let tmp = path.resolve(resource.context.replace("frontend/lib", "frontend/src"), resource.request);
                resource.request = tmp;
            }
        }),
    );

    //conf.plugins.push(new webpack.PrefetchPlugin(input.BASE_PATH + "/build/js/app.tsx"));

    /*conf.plugins.push(
        (new HardSourceWebpackPlugin({
            cacheDirectory: input.NODE_CACHE_DIR + "/hard-source/[confighash]",
        }))
    );*/

    if (input.PRODUCTION && !input.SSR) {
        conf.plugins.push(
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "bundle-[hash].css",
                chunkFilename: "[id].[hash].css",
            }),
        );

        //conf.plugins.push(new BundleAnalyzerPlugin());
        conf.optimization = {
            minimizer: [
                /*new UglifyJsPlugin({
                    cache: input.NODE_CACHE_DIR + "/uglifyjs-webpack-plugin",
                    parallel: true,
                    sourceMap: true, // set to true if you want JS source maps
                }),*/

                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        "postcss-safe-parser": true,
                        discardComments: { removeAll: true },
                        zindex: false,
                    },
                }),
            ],
            /*splitChunks: {
                chunks: 'all'
            },*/
        };
    } else {
        //incremental build optymalization
        conf.optimization = {
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false,
        };
        /*conf.output = {
            pathinfo: false
        }*/
    }

    return conf;
};
