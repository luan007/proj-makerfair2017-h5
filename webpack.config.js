var path = require("path");
var webpack = require("webpack");

var loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    query: {
      presets: ["babel-preset-es2015"],
      plugins: []
    }
  },
  {
    test: /\.less$/,
    use: [
      {
        loader: "style-loader" // creates style nodes from JS strings
      },
      {
        loader: "css-loader" // translates CSS into CommonJS
      },
      {
        loader: "less-loader" // compiles Less to CSS
      }
    ]
  }
];

module.exports = {
  devtool: "eval-source-map",
  entry: path.resolve("src", "main.js"),
  output: {
    path: path.resolve("dist"),
    filename: "main.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [],
  module: {
    loaders: loaders
  }
};
