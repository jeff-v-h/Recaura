const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const { pathHelper, getVendorName } = require("./buildHelpers");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env) {
  return merge(common(env), {
    mode: "development",
    entry: {
      // publicApp: pathHelper('src', 'components', 'public', 'PublicApp.tsx'),
      app: pathHelper("src", "index.tsx"),
    },
    devtool: "eval-cheap-module-source-map",
    devServer: {
      contentBase: pathHelper("./dist"),
      hot: true,
      historyApiFallback: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: `${getVendorName(env)}.css`,
        ignoreOrder: true,
      })
    ],
  });
};
