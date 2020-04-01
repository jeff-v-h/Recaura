const { pathHelper, getVendorName } = require("./buildHelpers");
const WriteFilePlugin = require("write-file-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const WarningsToErrorsPlugin = require("warnings-to-errors-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getOutputDir() {
  return pathHelper("../Dawn.Web/wwwroot/bundle");
}

module.exports = function(env) {
  return {
    output: {
      path: getOutputDir(),
      filename: env.production ? "[name].[contenthash].js" : "[name].js"
    },
    optimization: {
      noEmitOnErrors: true,
      splitChunks: {
        name: getVendorName(env),
        chunks: "all"
      }
    },
    performance: {
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: [pathHelper("src")],
          use: [{ loader: "ts-loader", options: { transpileOnly: true } }]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            "css-loader"
          ]
        },
        {
          test: /\.scss$/,
          include: [pathHelper("src")],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[local]-[hash:base64:5]"
                },
                importLoaders: 1
              }
            },
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new WriteFilePlugin(),
      new AssetsPlugin({
        path: getOutputDir()
      }),
      new CaseSensitivePathsPlugin(),
      new WarningsToErrorsPlugin(),
      new ForkTsCheckerWebpackPlugin({
        eslint: true
      })
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        App: pathHelper("app"),
        Components: pathHelper("app", "components"),
        Api: pathHelper("app", "api"),
        Enums: pathHelper("app", "enums"),
        Styles: pathHelper("app", "styles"),
        Helpers: pathHelper("app", "helpers"),
        Constants: pathHelper("app", "constants"),
        Stores: pathHelper("app", "stores")
      }
    }
  };
};
