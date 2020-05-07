const common = require("./webpack.common.js");
const merge = require("webpack-merge");
var TerserPlugin = require("terser-webpack-plugin");
const { pathHelper, getVendorName } = require("./buildHelpers");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(env) {
  return merge(common(env), {
    mode: "production",

    entry: {
      app: pathHelper("src", "index.tsx")
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: `${getVendorName(env.ENVIRONMENT)}.[contenthash].css`
      })
    ],

    // This configuration prevents the names of the private SignalR transport classes from being
    // mangled so that we can use them in diagnostic messages.
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            mangle: {
              reserved: [
                "WebSocketTransport",
                "LongPollingTransport",
                "ServerSentEventsTransport"
              ]
            }
          }
        })
      ]
    }
  });
};
