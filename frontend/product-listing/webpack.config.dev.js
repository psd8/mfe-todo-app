const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "package.json"));
require("dotenv").config();

module.exports = {
  mode: "development",
  devServer: {
    hot: true,
    host: "0.0.0.0", // Important for Docker
    port: 8082,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "same-site",
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
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.json$/,
        type: "json", // Built-in support, no need for 'json-loader'
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "ProductListing",
      remotes: {
        remote1: `remote1@${process.env.REACT_APP_DND_COMPONENT_URL}/remoteEntry.js`,
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
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env), // Inject environment variables
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
