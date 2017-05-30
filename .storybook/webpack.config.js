// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
    plugins: [
        // your custom plugins
    ],
    module: {
        loaders: [
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap' //postcss-loader!
            },
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=/cache/[hash].[ext]'},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=/cache/[hash].[ext]'}
        ],
    },
};

