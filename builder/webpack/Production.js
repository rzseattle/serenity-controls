//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');



var getProductionConf = function (ENTRY_POINTS, PUBLIC_PATH, PATH, BASE_PATH, LANGUAGE, ANALYZE, webpack) {
    conf = {};
    conf.entry = ENTRY_POINTS;
    conf.output = {
        filename: `bundle-[name]-[hash].min.js`,
        chunkFilename: `chunk-[id]-[name]-[hash].bundle.js`,
        path: PATH,
        publicPath: PUBLIC_PATH
    };
    conf.stats = "errors-only";
    conf.plugins = [
        //new webpack.optimize.ModuleConcatenationPlugin(),
        //new ExtractTextPlugin({filename: 'bundle-[hash].css', allChunks: true}),


        new webpack.DefinePlugin({
            "PRODUCTION": JSON.stringify(true),
            LANGUAGE: JSON.stringify(LANGUAGE),
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(pl)$/),

        //new webpack.optimize.OccurrenceOrderPlugin(),


    ];
    if (ANALYZE) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        conf.plugins.push(new BundleAnalyzerPlugin());
    }

    conf.plugins.push(
        function () {
            this.plugin("after-emit", function (compilation, callback) {
                var stats = compilation.getStats().toJson();
                if (stats) {
                    console.log(stats.assetsByChunkName);
                    let content = stats.assetsByChunkName.admin + "|" + compilation.getStats().hash
                    fs.writeFile(PATH + `/compilation-hash.txt`, content, function () {
                        callback();
                    });
                }
            })
        }
    );


    return conf;

};


module.exports = getProductionConf;
