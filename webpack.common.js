const path = require('path'); //Path Module from Node.js,Create Relative Route
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
//All Configurations Go In Module Object
module.exports = {
    mode: 'development',
    entry: ['./src/js/index.js', './src/css/style.scss'],
    watch: true,
    // watchOptions:{
    //     aggregationTimeout:500,
    //     poll:1000,
    //     ignored:/node_modules/
    // },
    // devtool: 'source-maps',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true,
        hot: true, //Update Without Reload
        open: true, //Open Page When Start Server
        inline: true, //Inject Javascript Inline
        liveReload: false
    },
    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: "./css/[name].css"
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            moment: 'moment'
        }),
        new webpack.HotModuleReplacementPlugin(
            { multiStep: true }
        ),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'postcss-loader'],
              },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    {
                      loader: 'css-loader',
                      options: {
                        // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file

                        // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                        importLoaders: 1,
                        // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
                        modules: { auto: true },
                      },
                    },
                    {
                      loader: 'postcss-loader',
                    },
                    {
                      loader: 'sass-loader',
                      options: {
                      webpackImporter: false,
                      sassOptions: {
                     includePaths: ['node_modules'],
                    },
                    },
                    },

                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: "[name].[ext]",
                        outputPath: "css/img",
                        publicPath: "./img",
                    }
                }]
            }

        ]
    }

}
