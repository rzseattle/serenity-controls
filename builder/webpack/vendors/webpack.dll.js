var {resolve} = require('path');
var webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (input) {

    var conf = {
        entry: {
            vendors: [
                resolve(__dirname, '../../../src/vendors.js'),
                input.BASE_PATH + '/build/js/vendors.js'
            ]
        },
        output: {
            // The bundle file
            filename: 'vendor-[id]-[hash].min.js',
            path: input.PATH,
            publicPath: input.PUBLIC_PATH,
            library: '[name]'
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loaders: [
                        'react-hot-loader/webpack',
                        {
                            loader: 'awesome-typescript-loader', query: {
                                configFileName: resolve(__dirname, '../tsconfig.json')
                            }
                        }
                    ]
                },
                {test: /\.css/, loader: 'style-loader!css-loader'},
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'file-loader?hash=sha512&digest=hex&name=./cache/[hash].[ext]',
                        {
                            loader: 'image-webpack-loader',
                            query: {
                                mozjpeg: {
                                    progressive: true
                                },
                                gifsicle: {
                                    interlaced: false
                                },
                                optipng: {
                                    optimizationLevel: 4
                                },
                                pngquant: {
                                    quality: '75-90',
                                    speed: 3
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader',
                    options: {
                        name: 'name=/cache/[hash].[ext]'
                    }
                },
                {
                    test: [/\.sass/, /\.scss/],
                    loader: ExtractTextPlugin.extract(
                      [
                          {loader: 'css-loader', query: {sourceMap: true}},
                          {loader: 'resolve-url-loader', query: {sourceMap: true}},
                          {
                              loader: 'sass-loader',
                              query: {
                                  sourceMap: true,
                                  includePaths: ['node_modules']
                              }
                          }

                      ]
                    )
                }
            ]
        },
        plugins: [
            new webpack.DllPlugin({
                // The manifest we will use to reference the libraries
                path: input.PATH + '/vendors-reference.json',
                name: '[name]',
                context: input.BASE_PATH
            }),
            new webpack.optimize.UglifyJsPlugin({comments: false, minimize: true, sourceMap: true}),
            new AssetsPlugin({
                path: input.PATH,
                update: true

            }),
            new ExtractTextPlugin({filename: 'vendor-[hash].css', allChunks: true})
        ],
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.es6', '.ts', '.tsx'],
        }
    };
    return conf;
};