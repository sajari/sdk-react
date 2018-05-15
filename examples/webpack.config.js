const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    sajari: path.resolve(__dirname, "./index.js")
  },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: [/\.jsx?/, /\.tsx?/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    alias: {
      "sajari-react$": path.resolve(__dirname, "../dist/index.es.js")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html")
    })
  ],
  node: {
    fs: "empty",
    child_process: "empty"
  }
};
