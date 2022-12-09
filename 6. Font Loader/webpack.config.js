const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(css)$/, //css part that need to match at the end of the particular file, $ specifies it has to at the end of the file
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } }, //option property is require to enable css modules
        ],
      },
      {
        test: /.s[ac]ss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } }, //option property is require to enable css modules
          {loader: "sass-loader" } //deal with scss import statements 
        ],
      },
      {
        test: /.(png|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /.(ttf|woff|woff2)$/,
        type: "asset/resource",
      },
    ],
  },
};
