const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const EsLintPlugin = require("eslint-webpack-plugin");




module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new miniCssExtractPlugin(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 9000,
    open: true, //like we added in package.json
    historyApiFallback: true, //to make work browser's back and forward arrows, it tells webpack that our routing manage by client-side by react so do not try to make server call for it
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader", //added babel loader to make webpack understand JXS
            options: {
              presets: [ //required for babel loader configurations
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ]
      },
      {
        test: /\.css$/,
        use: [
          miniCssExtractPlugin.loader, "css-loader",
        {
          loader: "postcss-loader", //to add some css polyfils to supports on diff browsers, we use this loader
          options: {
            postcssOptions: {
              plugins: [["postcss-preset-env", {}]],
            },
          },
        },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [miniCssExtractPlugin.loader, "css-loader", 
        {
          loader: "postcss-loader", //to add some css polyfils to supports on diff browsers, we use this loader
          options: {
            postcssOptions: {
              plugins: [["postcss-preset-env", {}]],
            },
          },
        },
          "sass-loader"],
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        type: "asset/resource", //in-built loader
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}