const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");


const config = {
    mode: "production",


    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    resolve: {
        extensions: [".js", ".json", ".css", ".ts", ".tsx"],
        modules: [__dirname, "node_modules"],
    },


    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: `'production'`,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: [/\.js$/, /\.es6$/, /\.tsx/, /\.ts$/],
                loader: "babel-loader",
                options: {
                    babelrc: false,
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: ["last 1 Chrome versions", "last 1 Firefox versions", "last 1 Edge versions"],
                                    node: "current",

                                },
                                useBuiltIns: "entry",
                                modules: false,
                                forceAllTransforms: true,
                            },
                        ],
                        "@babel/preset-typescript",
                        "@babel/react",
                    ],
                    plugins: [
                        "transform-react-constant-elements",
                        /*"transform-react-inline-elements",*/
                        "@babel/plugin-syntax-jsx",
                        "@babel/proposal-class-properties",
                        "@babel/proposal-object-rest-spread",
                        "@babel/plugin-syntax-dynamic-import",


                    ],
                },

            },
        ],
    },
};

const serverConfig = {
    ...config,
    entry: { server: path.resolve(__dirname, "src/server.tsx") },
    target: "node",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.js",
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: nodeExternals(),
    //…
};

const clientConfig = {
    ...config,
    entry: { client: path.resolve(__dirname, "src/client/client.tsx") },
    target: "web", // <=== can be omitted as default is 'web'
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "client.js",
    },

    //…
};

clientConfig.module.rules[0].options.plugins.push("react-hot-loader/babel")

if (true) {
    const PORT  = 3000;
    const HTTPS = false;
    config.output = {
        publicPath: "http" + (HTTPS ? "s" : "") + `://localhost:${PORT}/`,
        filename: "client.js",
    }
    config.devServer = {

        inline:true,
        port: PORT,
        https: true,
        hot: true,
        publicPath: "http" + (HTTPS ? "s" : "") + `://localhost:${PORT}/`,
        host: "localhost",

        stats:
            "minimal" /*{
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
        },*/,

        disableHostCheck: true,

        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/javascript",
        },
    };
    //console.log(config);
}


module.exports = clientConfig; //[/*serverConfig,*/ clientConfig];