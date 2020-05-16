const common = require('./webpack.common.js');
const merge = require('webpack-merge');
var TerserPlugin = require('terser-webpack-plugin');
const { pathHelper, getVendorName } = require('./buildHelpers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = function (env) {
  return merge(common(env), {
    mode: 'production',
    entry: {
      app: pathHelper('src', 'index.tsx')
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc)ss$/,
          include: [pathHelper('src')],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]-[hash:base64:5]'
                },
                importLoaders: 1
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: `${getVendorName(env)}.[contenthash].css`
      }),
      new Dotenv({
        path: env.docker ? './.env.docker.prod' : './.env',
        allowEmptyValues: true,
        safe: true
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
              reserved: ['WebSocketTransport', 'LongPollingTransport', 'ServerSentEventsTransport']
            }
          }
        })
      ]
    }
  });
};
