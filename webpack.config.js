const webpack = require("webpack");
const path = require("path");

const nodeModulesPath = path.join(__dirname, "node_modules");

module.exports = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        loaders: [
          {
            test: require.resolve("jsgif/b64"),
            loader: "expose-loader?encode64"
          }
        ]
      }
    }),
    new webpack.ProvidePlugin({
      encode64: "jsgif/b64"
    })
  ]
};
