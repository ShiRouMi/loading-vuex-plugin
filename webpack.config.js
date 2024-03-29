const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  plugins: [new CleanWebpackPlugin()],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "vuex-loading-plugin.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
}
