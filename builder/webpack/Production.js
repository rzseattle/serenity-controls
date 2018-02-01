const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
            parallel: true,
            comments: false,
            minimize: true,
            sourceMap: true,
            cacheDir: "node_modules/.cache/UglifyJsPlugin",
            cache: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin()

    ];
    if (ANALYZE) {
        conf.plugins.push(new BundleAnalyzerPlugin());
    }


    return conf;

};


module.exports = getProductionConf;
