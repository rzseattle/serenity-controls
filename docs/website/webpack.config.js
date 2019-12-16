const webpack = require("webpack");
const path = require("path");

module.exports = (env) => {

    const config = {
        mode: "production",
        entry: { client: path.resolve(__dirname, "src/client/client.tsx") },

        output: {
            path: path.resolve(__dirname, "../../website-build/dist"),
            filename: "client.js",
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
                                        browsers: [
                                            "last 1 Chrome versions",
                                            "last 1 Firefox versions",
                                            "last 1 Edge versions",
                                        ],
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
                            /*"transform-react-constant-elements",*/
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

    if (!env.production) {
        //config.module.rules[0].options.plugins.push("react-hot-loader/babel")

        const PORT = 3001;
        const HTTPS = true;
        config.output = {
            publicPath: "http" + (HTTPS ? "s" : "") + `://localhost:${PORT}/`,
            filename: "client.js",
        };
        config.resolve = {
            ...config.resolve,
            alias: {
                "react-dom": "@hot-loader/react-dom",
            },
        };
        config.mode = "development";

        config.devServer = {
            inline: true,
            port: PORT,
            https: HTTPS,
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
    }
    return config;
};
