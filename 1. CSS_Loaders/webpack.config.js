const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.css$/, //css part that need to match at the end of the particular file, $ specifies it has to at the end of the file
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } }, //option property is require to enable css modules
        ],
      },
    ],
  },
};
