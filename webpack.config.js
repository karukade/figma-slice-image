/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin")
// const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin")
const isDev = process.env.NODE_ENV === "development"
const isServe = process.env.NODE_ENV === "serve"

const plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: "./src/ui.html",
    filename: "ui.html",
  }),
].concat(isServe ? [] : [new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/^ui/])])

module.exports = {
  mode: isDev ? "development" : "production",
  entry: {
    ui: "./src/ui.tsx", // The entry point for your UI code
    code: "./src/code.ts", // The entry point for your plugin code
  },
  devtool: isDev ? "inline-source-map" : isServe ? "eval" : false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"],
    fallback: {
      path: require.resolve("path-browserify"),
      fs: require.resolve("./fallback/fs"),
    },
  },
  plugins,
}
