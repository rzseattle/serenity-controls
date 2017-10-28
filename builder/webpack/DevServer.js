const {CheckerPlugin} = require('awesome-typescript-loader')
const path = require('path');
const fs = require('fs');

var getDevServerConf = function (ENTRY_POINTS, PUBLIC_PATH, PATH, BASE_PATH, HTTPS, webpack) {
    conf = {};

    conf.output = {
        filename: 'bundle.js',
        publicPath: 'http' + (HTTPS ? 's' : '') + '://localhost:3000/',
        devtoolModuleFilenameTemplate: function (info) {
            return path.resolve(BASE_PATH, info.absoluteResourcePath);
        }
    }
    let devEntries = [];

    for (let i in ENTRY_POINTS) {
        devEntries.push(ENTRY_POINTS[i]);
    }

    conf.devServer = {

        https: HTTPS,
        /*https: {
            key: fs.readFileSync("./ssl/ia.key"),
            cert: fs.readFileSync("./ssl/ia.crt"),
            //ca: fs.readFileSync("./cert2.pem"),
        },*/
        //pfx: resolve(__dirname, './cert2.pfx'),
        //pfxPassphrase: 'xxx123',
        hot: true,
        port: 3000,
        publicPath: 'http' + (HTTPS ? 's' : '') + '://localhost:3000/',
        host: 'localhost',

        disableHostCheck: true,

        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/javascript'
        },

        setup: (app) => {
            app.get('/debug/getFile', function (req, res) {
                res.header('Access-Control-Allow-Origin', '*');
                res.send(fs.readFileSync(req.param('file')));
            });

        }
    };
    conf.entry = [

        require.resolve('react-hot-loader/patch'),

    ].concat(devEntries);

    conf.plugins = [
        /*new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendor.js']
        }),*/
        new CheckerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            'process.env.NODE_ENV': JSON.stringify('development')
        })


    ];

    return conf;

}


module.exports = getDevServerConf;
