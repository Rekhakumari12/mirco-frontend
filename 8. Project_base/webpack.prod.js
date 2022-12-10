const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')


//purgePath for removing dead css
const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = merge(commonConfig, {
  mode: "production",
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [miniCssExtractPlugin.loader, "css-loader"],
          },
          {
              test: /\.s[ac]ss$/,
              use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
      ],
  },
  plugins: [ 
      new copyWebpackPlugin({
          //is use to easily copy files from project to dist
          patterns: [
              {
                  from: path.resolve(__dirname, "./src/assets/images/*"),
                  to: path.resolve(__dirname, "dist"),
                  context: "src",
              },
          ],
      }),
      new PurgeCSSPlugin({
          paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
          safelist: ["dummy-css"], //pass this to ignore some css from purge-css
      }),
      new miniCssExtractPlugin({}),
  ],
});
