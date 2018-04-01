const webpack = require("webpack");
const path = require("path");

const nodeModulesPath = path.join(__dirname, "node_modules");

module.exports = {
  entry: {
    app: path.join(__dirname, "./src/index.tsx")
  },
  output: {
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        loaders: [
          {
            test: require.resolve("jsgif/LZWEncoder"),
            loader: "expose-loader?LZWEncoder"
          },
          {
            test: require.resolve("jsgif/NeuQuant"),
            loader: "expose-loader?NeuQuant"
          }
        ]
      }
    }),
    new webpack.ProvidePlugin({
      LZWEncoder: "jsgif/LZWEncoder",
      NeuQuant: "jsgif/NeuQuant"
    })
  ]
};
