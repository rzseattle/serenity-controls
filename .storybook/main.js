module.exports = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(ts|tsx)"],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-storysource",
        "@storybook/addon-contexts/register",
        "storybook-addon-pseudo-states",
        "@storybook/addon-actions",
        //"@storybook/preset-scss",
    ],

    webpackFinal: async (config, { configType }) => {
        config.devtool = "cheap-module-source-map";

        config.module.rules.push({
            test: /module\.sass$/,

            use: [
                "style-loader",
                { loader: "css-loader", options: { sourceMap: true, modules: true } },
                {
                    loader: "sass-loader",
                    options: {
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
                { loader: "css-loader", options: { sourceMap: true } },
                //'postcss-loader',
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        sassOptions: { includePaths: ["node_modules"] },
                    },
                },
            ],
        });

        // Return the altered config
        return config;
    },

    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },

    docs: {
        autodocs: true,
    },
};
