const common = require('./webpack.common');
const path = require('path'); //Path Module from Node.js,Create Relative Route
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');



//Merge whatever in common.js with the following content
module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: "./js/[name].js",
        path: path.resolve(__dirname, "dist"), //Distribution Folder
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: "Image Upload Crop Resize Javascript Project",
                template: path.resolve("./src/index.html"),
                filename: "index.html",
            }
        ),
        new CopyPlugin({
            patterns: [
                { from: path.resolve("./src/img"), to: path.resolve(__dirname, 'dist/css/img') },
            ],
        }),

    ],
    optimization: {
        minimize: true, //this line matters to compress/uncompress js files

        minimizer: [new UglifyJsPlugin(
            {
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true

            }
        )],
    },
    module: {
        rules: [

        ]
    }
}
);
