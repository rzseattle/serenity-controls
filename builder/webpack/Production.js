const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

var getProductionConf = function (ENTRY_POINTS, PUBLIC_PATH, PATH, BASE_PATH, LANGUAGE, ANALYZE, webpack) {
    conf = {};
    conf.entry = ENTRY_POINTS;
    conf.output = {
        filename: `bundle-${LANGUAGE}-[id]-[hash].min.js`,
        path: PATH,
        publicPath: PUBLIC_PATH
    };
    conf.plugins = [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({filename: 'bundle-[hash].css', allChunks: true}),


        new webpack.DefinePlugin({
            "PRODUCTION": true,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(pl)$/),

        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            minimize: true,
            sourceMap: true,
            cacheDir: "node_modules/.cache/UglifyJsPlugin",
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),

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
            threadPool: HappyPack.ThreadPool({size: 4}),

        }),
        new HappyPack({
            id: 'js',
            loaders: ['babel-loader?babelrc=true&cacheDirectory=true&extends=' + require('path').join(__dirname, '/.babelrc')],
            threadPool: HappyPack.ThreadPool({size: 4}),
        }),
        new HappyPack({
            id: 'tsx',
            loaders: [
                {
                    loader: 'awesome-typescript-loader', query: {
                        configFileName: path.resolve(__dirname, './tsconfig.json'),
                        useCache: true,
                        cacheDirectory: 'node_modules/.cache/awcache',
                        forceIsolatedModules: true,
                        reportFiles: [
                            "views/!**!/!*.{ts,tsx}",
                            "src/!**!/!*.{ts,tsx}",
                        ]
                    }
                }
            ],
            threadPool: HappyPack.ThreadPool({size: 4}),
        }),


    ];
    if (ANALYZE) {
        conf.plugins.push(new BundleAnalyzerPlugin());
    }


    return conf;

};


module.exports = getProductionConf;
