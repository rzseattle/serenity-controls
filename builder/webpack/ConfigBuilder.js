const webpack = require('webpack');
var {resolve, basename} = require('path');
const fs = require('fs');
const HappyPack = require('happypack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

let configDefaults = {
    HTTPS: false,
    ANALYZE: false,
    PORT: 3000,
    USE_FRAMEWORK_OBSERVERS: true,
    LANGUAGE: "pl"
};


module.exports = function (input) {

    input = Object.assign(configDefaults, input);


    var conf = {
        context: resolve(__dirname, ''),
        devtool: input.PRODUCTION ? 'source-map' : 'cheap-module-source-map',
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            unsafeCache: true,
            modules: ['node_modules'],
            cacheWithContext: false

        }


    };
    const GetLoaders = require('./Loaders.js');
    conf.module = GetLoaders(input.PRODUCTION, input);

    let tmp;
    if (!input.PRODUCTION) {

        if (input.USE_FRAMEWORK_OBSERVERS) {
            const FileObserver = require('./FileObserver.js');
            FileObserver(
                input.BASE_PATH,
                resolve(input.BASE_PATH, './build/js/tmp/components.include.js'),
                resolve(input.BASE_PATH, './build/js/tmp/components.include.sass')
            );
        }


        const getDevServerConf = require('./DevServer.js');
        tmp = getDevServerConf(
            input.ENTRY_POINTS,
            input.PUBLIC_PATH,
            resolve(input.BASE_PATH, input.PUBLIC_PATH),
            input.BASE_PATH,
            input.HTTPS,
            input.PORT || 3000,
            input.DOMAIN,
            input.LANGUAGE,
            webpack
        );
    } else {
        const getProductionConf = require('./Production.js');
        tmp = getProductionConf(
            input.ENTRY_POINTS,
            input.PUBLIC_PATH,
            input.PATH,
            input.BASE_PATH,
            input.LANGUAGE,
            input.ANALYZE,
            webpack
        );
    }

    for (let i in tmp) {
        conf[i] = tmp[i];
    }

    var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

    let threads = HappyPack.ThreadPool({size: 2});

    conf.plugins = conf.plugins.concat([
        new HappyPack({
            id: 'sass',
            loaders: [
                {loader: 'css-loader', query: {sourceMap: true}},
                {loader: 'resolve-url-loader', query: {sourceMap: true}},
                {
                    loader: 'sass-loader',
                    query: {
                        sourceMap: true,
                        includePaths: ['node_modules']
                    }
                }
            ],

            threadPool: threads,

        }),

        new HappyPack({
            id: 'js',
            loaders: ['babel-loader?babelrc=true&cacheDirectory=true&extends=' + require('path').join(__dirname, '/.babelrc')],
            threadPool: threads,
        }),
        new HappyPack({
            id: 'css',
            loaders: ['style-loader!css-loader'],
            threadPool: threads,
        }),
        new HappyPack({
            id: 'tsx',
            loaders: [
                'react-hot-loader/webpack',
                {
                    path: 'ts-loader',
                    query: {
                        happyPackMode: true,
                        transpileOnly: true
                    }
                }
            ],
            threadPool: threads,
        }),
    ]);


    conf.plugins.push(new HardSourceWebpackPlugin({
        // Either an absolute path or relative to webpack's options.context.
        cacheDirectory: input.BASE_PATH + '/node_modules/.cache/hard-source/[confighash]',
        // Either an absolute path or relative to webpack's options.context.
        // Sets webpack's recordsPath if not already set.
        recordsPath: input.BASE_PATH + '/node_modules/.cache/hard-source/[confighash]/records.json',
        configHash: function (webpackConfig) {
            // node-object-hash on npm can be used to build this.
            return require('node-object-hash')({sort: false}).hash(webpackConfig);
        },
        // Either false, a string, an object, or a project hashing function.
        environmentHash: {
            root: process.cwd(),
            directories: [],
            files: ['package-lock.json', 'yarn.lock'],
        },
    }));
    conf.plugins.push(new ForkTsCheckerWebpackPlugin());
    conf.plugins.push(new webpack.PrefetchPlugin(input.BASE_PATH + '/build/js/app.tsx'));
    conf.plugins.push(new webpack.PrefetchPlugin(input.BASE_PATH + '/build/js/App.sass'));

    if (input.PRODUCTION) {

        conf.plugins.push(new ExtractTextPlugin(`bundle-[hash].css`));

    }


    conf.plugins.push(
        function () {
            this.plugin("done", function (stats) {

                var stats = stats.toJson();
                //console.log(stats.warnings);

                let missingLang = {};
                if (stats.warnings && stats.warnings.length) {
                    for (let i in stats.warnings) {
                        let el = "" + stats.warnings[i];
                        if (el.indexOf("Missing localization: ") != -1) {
                            let lines = ("" + el).split("\n");
                            for (let x = 0; x < lines.length; x++) {
                                if (lines[x].indexOf("Missing localization: ") == 0) {
                                    missingLang[lines[x].replace("Missing localization: ", "")] = "";
                                }
                            }
                        }

                    }

                    fs.writeFile(resolve(input.BASE_PATH, `./build/js/tmp/missing-${input.LANGUAGE}-lang.json`), JSON.stringify(missingLang, null, 2), function () {

                    });

                }

                return true;
            });


        }
    );


    return conf;
}
;
