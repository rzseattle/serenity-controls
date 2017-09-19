const path = require('path');
var getLoaders = function (production) {

    let loaders =
        {
            loaders: [
                {
                    test: [/\.js$/, /\.es6$/],
                    exclude: function (modulePath) {
                        if (
                            modulePath.indexOf('frontend') == -1 &&
                            modulePath.indexOf('component.js') == -1

                        ) {
                            return true;
                        }
                        return false;
                    },
                    //loader: 'babel-loader',
                    //dodatkowe ustawienia potrzebne aby babel działał out of home dir ( inaczej nie parsował plików z zewnątrz)
                    loaders: 'babel-loader?babelrc=true&extends=' + require('path').join(__dirname, '/.babelrc')


                },

                {
                    test: /\.tsx?$/,
                    loaders: [
                        'react-hot-loader/webpack',
                        {
                            loader: 'awesome-typescript-loader', query: {
                                configFileName: path.resolve(__dirname, "./tsconfig.json")
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
                {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=/cache/[hash].[ext]'},
                {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=/cache/[hash].[ext]'}
            ]

        }

    if (production) {
        const ExtractTextPlugin = require('extract-text-webpack-plugin');
        loaders.loaders.push(
            {test: [/\.sass/, /\.scss/], loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap')} //postcss-loader!
        );
    } else {

        loaders.loaders.push(
            {
                test: /\.sass/,
                loaders: [
                    'style-loader',
                    {loader: 'css-loader', query: {sourceMap: true}},
                    {
                        loader: 'sass-loader',
                        query: {
                            sourceMap: true,
                            includePaths: ['node_modules']
                        }
                    }


                ]

            }
        );
    }

    return loaders;

}


module.exports = getLoaders;
