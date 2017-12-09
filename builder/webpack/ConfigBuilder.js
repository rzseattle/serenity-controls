const webpack = require('webpack');
var {resolve, basename} = require('path');
const fs = require('fs');

module.exports = function (input) {

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
    conf.module = GetLoaders(input.PRODUCTION);

    let tmp;
    if (!input.PRODUCTION) {

        const FileObserver = require('./FileObserver.js');
        FileObserver(
            input.BASE_PATH,
            resolve(input.BASE_PATH, './build/js/tmp/components.include.js'),
            resolve(input.BASE_PATH, './build/js/tmp/components.include.sass')
        );

        const getDevServerConf = require('./DevServer.js');
        tmp = getDevServerConf(
            input.ENTRY_POINTS,
            input.PUBLIC_PATH,
            resolve(input.BASE_PATH, input.PUBLIC_PATH),
            input.BASE_PATH,
            input.HTTPS,
            webpack
        );
    } else {
        const getProductionConf = require('./Production.js');
        tmp = getProductionConf(
            input.ENTRY_POINTS,
            input.PUBLIC_PATH,
            input.PATH,
            input.BASE_PATH,
            input.ANALYZE,
            webpack
        );
    }

    for (let i in tmp) {
        conf[i] = tmp[i];
    }


    conf.plugins.push(new webpack.PrefetchPlugin(input.BASE_PATH + '/build/js/app.tsx'));
    conf.plugins.push(new webpack.PrefetchPlugin(input.BASE_PATH + '/build/js/App.sass'));

    conf.plugins.push(
        new webpack.DllReferencePlugin({
            // An absolute path of your application source code
            context: input.BASE_PATH,
            // The path to the generated vendor-manifest file
            manifest: input.PATH + '/vendors-reference.json'
        })
    );


    return conf;
};
