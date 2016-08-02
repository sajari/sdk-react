var assign = require("object-assign");
var config = require("./webpack.common.config.js");

module.exports = assign({}, config, {
  entry: {
    app: ["./src/index.js"],
  },

  output: {
    path: "./build/",
    pathInfo: true,
    publicPath: "./build/",
    filename: "index.js",
    library: "sajar-sdk-react",
    libraryTarget: "commonjs2"
  },
});
