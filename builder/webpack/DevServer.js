const {CheckerPlugin} = require('awesome-typescript-loader')
const path = require('path');
const fs = require('fs');

var getDevServerConf = function (ENTRY_POINTS, PUBLIC_PATH, PATH, BASE_PATH, HTTPS, PORT, DOMAIN, webpack) {
    conf = {};

    conf.output = {
        filename: 'bundle.js',
        publicPath: 'http' + (HTTPS ? 's' : '') + `://localhost:${PORT}/`,
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
        port: PORT,
        publicPath: 'http' + (HTTPS ? 's' : '') + `://localhost:${PORT}/`,
        host: 'localhost',

        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: true,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: false,
            warnings: false,
            publicPath: false
        },


        disableHostCheck: true,

        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/javascript'
        },

        setup: (app) => {

            /*const busboyBodyParser = require('busboy-body-parser');
            app.use(busboyBodyParser({limit: '5mb', multi: true}));*/


            app.get('/debug/getFile', function (req, res) {
                res.header('Access-Control-Allow-Origin', '*');
                res.send(fs.readFileSync(req.param('file')));
            });

            /*app.post('/debug/getRoutes', function (req, res) {
                //let cache = fs.readFileSync(BASE_PATH + "/cache/symfony/route.json");
                let response = {
                    baseDir: BASE_PATH,
                    routes: DOMAIN//JSON.parse(cache)
                }
                res.send(JSON.stringify(response));

            });*/

            /*app.post('/debug/resolveComponent', function (req, res) {
                res.header('Access-Control-Allow-Origin', '*');

                let component = req.body.component;
                let _package = JSON.parse(req.body.packages);

                let exploded = component.split("_");

                let _path = "";
                let firstPart = exploded[0];
                delete(exploded[0]);
                if (_package[firstPart] != undefined) {
                    _path = path.resolve(BASE_PATH + "/" + _package[firstPart] + "/views" + exploded.join("/") + ".component.tsx");
                }
                res.send(JSON.stringify(
                    {
                        path: _path,
                        dir: path.dirname(_path)
                    }
                ));
            });*/

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
            DEV_PROPERIES: JSON.stringify({
                app_domain: DOMAIN,
                build_domain: JSON.stringify('http' + (HTTPS ? 's' : '') + `://localhost:${PORT}/`),
                project_dir: BASE_PATH
            }),

            'process.env.NODE_ENV': JSON.stringify('development')
        })


    ];

    return conf;

}


module.exports = getDevServerConf;
