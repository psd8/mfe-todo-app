const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");

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
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "ProductListing",
      remotes: {
        DndComponent: "DndComponent@http://localhost:8083/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
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
