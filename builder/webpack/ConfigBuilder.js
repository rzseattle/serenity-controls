const webpack = require('webpack');
var {resolve, basename} = require('path');
const fs = require('fs');

let configDefaults = {
    HTTPS: false,
    ANALYZE: false,
    PORT: 3000,
    USE_FRAMEWORK_OBSERVERS: true,
    LANGUAGE: "pl"
};


module.exports = function (input) {

    input = Object.assign(configDefaults, input);

    if (fs.existsSync(input.PATH + '/webpack-assets.json')) {
        const assets = require(input.PATH + '/webpack-assets.json');
        try {
            fs.unlinkSync(input.PATH + '/' + basename(assets.admin.js));
            fs.unlinkSync(input.PATH + '/' + basename(assets.admin.js) + ".map");
            fs.unlinkSync(input.PATH + '/' + basename(assets.admin.css));
            fs.unlinkSync(input.PATH + '/' + basename(assets.admin.css) + ".map");
        } catch (e) {
        }
    }


    var conf = {
        context: resolve(__dirname, ''),
        devtool: input.PRODUCTION ? 'source-map' : 'cheap-module-source-map',
        resolve: {
            extensions: ['.js', '.es6', '.ts', '.tsx'],
            unsafeCache: true,
            modules: ['node_modules']
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


    conf.plugins.push(new HardSourceWebpackPlugin({
        // Either an absolute path or relative to webpack's options.context.
        cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
        // Either an absolute path or relative to webpack's options.context.
        // Sets webpack's recordsPath if not already set.
        recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
    }));
    conf.plugins.push(new webpack.PrefetchPlugin(input.BASE_PATH + '/build/js/app.tsx'));
    conf.plugins.push(new webpack.PrefetchPlugin(input.BASE_PATH + '/build/js/App.sass'));

    conf.plugins.push(
        function () {
            this.plugin("done", function (stats) {

                fs.writeFile(input.PATH + '/compolation-hash.txt', stats.hash, function () {
                });

/*                fs.readdirSync(input.PATH).forEach(file => {
                    if( (file.indexOf('.js') != -1 || file.indexOf('.css') != -1) && file.indexOf(stats.hash) == -1){
                        fs.unlink(file, function(){});
                    }
                })*/


            })
        });


    if (false) {
        conf.plugins.push(
            new webpack.DllReferencePlugin({
                // An absolute path of your application source code
                context: input.BASE_PATH,
                // The path to the generated vendor-manifest file
                manifest: input.PATH + '/vendors-reference.json'
            })
        );
    }


    return conf;
}
;
