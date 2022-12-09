const path = require("path");
const htmpWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        index: "./src/index.js",
        courses: "./src/pages/courses.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devServer:{
        static: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins :[
        new htmpWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"), //path of html file which need to be bundled
            chunks: ["index"], // array of names for bunddled
            inject: true,
            filename: "index.html"//entry filename string
        }),
        new htmpWebpackPlugin({
            template: path.resolve(__dirname, "./src/pages/courses.html"), //path of html file which need to be bundled
            chunks: ["courses"], // array of names for bunddled
            inject: true,
            filename: "courses.html"//entry filename string
        })
    ]
};
