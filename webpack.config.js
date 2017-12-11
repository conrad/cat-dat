/* eslint-disable */

var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: [
    "webpack-hot-middleware/client",
    "babel-polyfill",
    "./index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/*.html' }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.md$/,
      loader: "html-loader!markdown-loader?gfm=false"
    }, {
      test: /\.(js|jsx)$/,
      loader: "babel-loader",
      query: {
        presets: ['es2015','react'],
        plugins: [
          [
            "react-transform", {
            transforms: [{
              transform: "react-transform-hmr",
              imports: ["react"],
              locals: ["module"]
            }, {
              transform: "react-transform-catch-errors",
              imports: ["react", "redbox-react"]
            }]
          },
          ]
        ]
      },
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css$/,
      loaders: ["style-loader", "css-loader"],
      include: path.join(__dirname, "src")
    }, {
      test: /\.svg$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      include: path.join(__dirname, "src/assets")
    }, {
      test: /\.png$/,
      loader: "url-loader?mimetype=image/png",
      include: path.join(__dirname, "src/assets")
    }, {
      test: /\.gif$/,
      loader: "url-loader?mimetype=image/gif",
      include: path.join(__dirname, "src/assets")
    }, {
      test: /\.jpg$/,
      loader: "url-loader?mimetype=image/jpg",
      include: path.join(__dirname, "src/assets")
    }]
  }
};
