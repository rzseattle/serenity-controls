module.exports = {
    stories: ["../new-stories/**/*.stories.mdx", "../new-stories/**/*.stories.@(ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        '@storybook/addon-storysource'
        //"@storybook/preset-scss",
    ],
    webpackFinal: async (config, { configType }) => {
        config.devtool = "cheap-module-eval-source-map";

        config.module.rules.push({
            test: /module\.sass$/,

            use: [
                "style-loader",
                { loader: "css-loader", query: { sourceMap: true, modules: true } },
                {
                    loader: "sass-loader",
                    query: {
                        sourceMap: true,
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.sass$/,
            exclude: (el) => {
                //exclude modules
                if (el.indexOf("module.") !== -1) {
                    return true;
                }
                return false;
            },
            use: [
                "style-loader",
                { loader: "css-loader", query: { sourceMap: true } },
                //'postcss-loader',
                {
                    loader: "sass-loader",
                    query: {
                        sourceMap: true,
                        sassOptions: { includePaths: ["node_modules"] },
                    },
                },
            ],
        });

        // Return the altered config
        return config;
    },
};
