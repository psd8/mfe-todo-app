const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "package.json"));
require("dotenv").config();
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackObfuscator = require("webpack-obfuscator");

module.exports = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.json$/,
        type: "json",
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new ModuleFederationPlugin({
      name: "ProductListing",
      remotes: {
        DndComponent: `DndComponent@${process.env.REACT_APP_DND_COMPONENT_URL}/remoteEntry.js`,
        AutoSaveComponent: `AutoSaveComponent@${process.env.REACT_APP_AUTOSAVE_COMPONENT_URL}/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
        "@emotion/react": {
          singleton: true,
          requiredVersion: packageJson.dependencies["@emotion/react"],
        },
        "@emotion/styled": {
          singleton: true,
          requiredVersion: packageJson.dependencies["@emotion/styled"],
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: packageJson.dependencies["@mui/material"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new WebpackManifestPlugin({
      filename: "manifest.json",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new WebpackObfuscator(
      { rotateStringArray: true, reservedStrings: ["s*"] },
      []
    ),
  ],
};
