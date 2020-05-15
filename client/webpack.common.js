const { pathHelper, getVendorName } = require('./buildHelpers');
const WriteFilePlugin = require('write-file-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WarningsToErrorsPlugin = require('warnings-to-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function getOutputDir() {
  return pathHelper('dist');
}

function getEnvionmentVariableKeys(env) {
  // Determin which .env file to use for environment variables
  const currentPath = path.join(__dirname);
  const basePath = currentPath + '/.env';
  const envPath = basePath + '.' + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // call dotenv and it will return an Object with a parsed key
  const envVars = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before
  return Object.keys(envVars).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
    return prev;
  }, {});
}

module.exports = function (env) {
  const envKeys = getEnvionmentVariableKeys(env);

  return {
    output: {
      path: getOutputDir(),
      publicPath: '/',
      filename: env.production ? '[name].[contenthash].js' : '[name].js'
    },
    optimization: {
      noEmitOnErrors: true,
      splitChunks: {
        name: getVendorName(env),
        chunks: 'all'
      }
    },
    performance: {
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: [pathHelper('src')],
          use: [{ loader: 'ts-loader', options: { transpileOnly: true } }]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
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
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader' // translates CSS into CommonJS
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                modifyVars: {
                  'primary-color': '#f5950f',
                  'link-color': '#0c93fa',
                  'border-radius-base': '4px'
                },
                javascriptEnabled: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // new CleanWebpackPlugin(["dist"]),
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html',
        favicon: './public/favicon.ico',
        inject: true
      }),
      new WriteFilePlugin(),
      new AssetsPlugin({
        path: getOutputDir()
      }),
      new CaseSensitivePathsPlugin(),
      new WarningsToErrorsPlugin(),
      new ForkTsCheckerWebpackPlugin({
        eslint: true
      }),
      new ManifestPlugin(),
      new webpack.DefinePlugin(envKeys)
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss', '.less'],
      alias: {
        Src: pathHelper('src'),
        Components: pathHelper('src', 'components'),
        Api: pathHelper('src', 'api')
      }
    }
  };
};
