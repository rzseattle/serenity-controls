// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      frontend: path.resolve(__dirname, "../")
    }
  },
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve("@storybook/addon-storysource/loader")],
        enforce: "pre"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        //use: "happypack/loader?id=sass"
        use: [
          "style-loader",
          { loader: "css-loader", query: { sourceMap: true } },
          { loader: "resolve-url-loader", query: { sourceMap: true } },
          //'postcss-loader',
          {
            loader: "sass-loader",
            query: {
              sourceMap: true,
              includePaths: ["node_modules"]
            }
          }
        ]
      },
      {
        test: [/\.tsx/, /\.ts$/],
        loaders: [
          {
            loader: "awesome-typescript-loader", query: {
              configFileName: path.resolve(__dirname, "../builder/webpack/tsconfig.json"),
              //cacheDirectory: input.NODE_CACHE_DIR + "/awcache",

              useCache: true,
              noImplicitAny: true,
              transpileOnly: true,
              forceIsolatedModules: true,
              reportFiles: [
                "views/**/*.{ts,tsx}",
                "vendor/arrow/**/*.{ts,tsx}",
                "node_modules_shared/src/**/*.{ts,tsx}"
              ],
              useBabel: true,
              babelCore: "@babel/core",
              babelOptions: {
                babelrc: false,
                retainLines: true,
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: {
                        browsers: [
                          "last 1 Chrome versions",
                          "last 1 Firefox versions",
                          "last 1 Edge versions"
                        ],
                        node: "current"
                      },
                      useBuiltIns: "entry",
                      modules: false
                    }
                  ],
                  "@babel/react"
                ],

                plugins: [
                  "transform-react-constant-elements",
                  "transform-react-inline-elements",
                  "@babel/plugin-syntax-jsx",
                  "@babel/plugin-syntax-dynamic-import",
                  "@babel/proposal-class-properties",
                  "@babel/proposal-object-rest-spread",
                  "react-hot-loader/babel"

                ]
              }

            }
          },
          {
            loader: "react-docgen-typescript-loader"
          },
          {

            loader: "string-replace-loader",
            options: {
              search: "../../../../build/js/lang/i18",
              replace: "frontend/translations/i18n",
              flags: ""
            }
          }

        ]
      },
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /(node_modules|bower_components)/,
        loaders: [
          {
            loader: "babel-loader",
            options: {
              retainLines: true,
              exclude: /(node_modules|bower_components)/
            }

          }
        ]

      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "PRODUCTION": JSON.stringify(true),
      LANGUAGE: "en",
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ]
};
