const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var getProductionConf = function (ENTRY_POINTS, PUBLIC_PATH, PATH, BASE_PATH, ANALYZE, webpack) {
    conf = {};
    conf.entry = ENTRY_POINTS;
    conf.output = {
        filename: 'bundle-[id]-[hash].min.js',
        path: PATH,
        publicPath: PUBLIC_PATH
    };
    conf.plugins = [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({filename: 'bundle-[hash].css', allChunks: true}),


        new webpack.DefinePlugin({
            "PRODUCTION": true,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),


        new AssetsPlugin({path: PATH, update: true}),
        /*     new CleanWebpackPlugin(['dist'], {
                 root: PATH,
                 verbose: true,
                 dry: false
             }),*/
        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(pl)$/),

        new webpack.optimize.UglifyJsPlugin({comments: false, minimize: true, sourceMap: true}),
        new webpack.optimize.OccurrenceOrderPlugin()

    ];
    if (ANALYZE) {
        conf.plugins.push(new BundleAnalyzerPlugin());
    }


    return conf;

};


module.exports = getProductionConf;
