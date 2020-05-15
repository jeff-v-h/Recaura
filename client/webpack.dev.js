const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const { pathHelper, getVendorName } = require('./buildHelpers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = function (env) {
  return merge(common(env), {
    mode: 'development',
    entry: {
      // publicApp: pathHelper('src', 'components', 'public', 'PublicApp.tsx'),
      app: pathHelper('src', 'index.tsx')
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      contentBase: pathHelper('./dist'),
      hot: true,
      historyApiFallback: true,
      port: 3000,
      host: '0.0.0.0',
      disableHostCheck: true
      // watchOptions: {
      //   aggregateTimeout: 500, // delay before reloading
      //   poll: 1000 // enable polling since fsevents are not supported in docker
      // }
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc)ss$/,
          include: [pathHelper('src')],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true
              }
            },
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
        filename: '[name].css',
        chunkFilename: `${getVendorName(env)}.css`,
        ignoreOrder: true
      }),
      new Dotenv({
        path: './.env.development',
        allowEmptyValues: true,
        safe: true
      })
    ]
  });
};
