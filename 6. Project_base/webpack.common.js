const path = require("path");
const htmpWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const glob = require("glob");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

//purgePath for removing dead css
const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    entry: {
        index: "./src/index.js",
        courses: "./src/pages/courses.js",
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            mnt: "moment",
            $: "jquery",
        }),
        new htmpWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"), //path of html file which need to be bundled
            chunks: ["index"], // array of names for bunddled
            inject: true,
            filename: "index.html", //entry filename string
        }),
        new htmpWebpackPlugin({
            template: path.resolve(__dirname, "./src/pages/courses.html"), //path of html file which need to be bundled
            chunks: ["courses"], // array of names for bunddled
            inject: true,
            filename: "courses.html", //entry filename string
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
};
