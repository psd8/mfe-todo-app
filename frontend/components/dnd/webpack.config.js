const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "package.json"));

module.exports = {
  mode: "development",
  devServer: {
    port: 8083,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,

        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,

        // To Use babel Loader
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env" /* to transfer any advansed ES to ES5 */,
            "@babel/preset-react",
          ], // to compile react to ES5
        },
      },
      {
        test: /\.(svg|ico|png|json)$/,
        use: "file-loader",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "DndComponent",
      filename: "remoteEntry.js",
      exposes: {
        "./Grid": "./src/DndComponent",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        "@emotion/react": {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        "@emotion/styled": {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new WebpackManifestPlugin({
      filename: "manifest.json",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
