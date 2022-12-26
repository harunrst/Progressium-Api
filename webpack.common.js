const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//common configurations for all environments
module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: resolve(__dirname, ""),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        options: {
          allowTsInNodeModules: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ["*.LICENSE.txt"],
    }),
  ],
  target: "node",
};
