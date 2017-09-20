const webpack = require('webpack');
const {resolve} = require('path');

module.exports = function (input) {

    var conf = {
        context: resolve(__dirname, ''),
        devtool: input.PRODUCTION ? 'source-map' : 'cheap-module-source-map',
        resolve: {
            extensions: ['.js', '.es6', '.ts', '.tsx'],
            unsafeCache: true,
            modules: ['node_modules']
        }


    };
    const GetLoaders = require("./Loaders.js");
    conf.module = GetLoaders(input.PRODUCTION);

    let tmp;
    if (!input.PRODUCTION) {

        const FileObserver = require("./FileObserver.js");
        FileObserver(
            input.BASE_PATH,
            resolve(input.BASE_PATH, './build/js/tmp/components.include.js')
        )

        const getDevServerConf = require("./DevServer.js");
        tmp = getDevServerConf(
            input.ENTRY_POINTS,
            input.PUBLIC_PATH,
            resolve(input.BASE_PATH, input.PUBLIC_PATH),
            input.BASE_PATH,
            input.HTTPS,
            webpack
        );
    } else {
        const getProductionConf = require("./Production.js");
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

    return conf;
};
