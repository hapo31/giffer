const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
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
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ["ts-loader"],
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules")
        ]
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              importHeaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "./node_modules/jsgif/LZWEncoder.js"
      },
      {
        from: "./node_modules/jsgif/NeuQuant.js"
      },
      {
        from: "./node_modules/jsgif/GIFEncoder.js"
      }
    ])
  ]
};
