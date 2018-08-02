const webpack = require('webpack');
const HappyPack = require('happypack');
const { resolve } = require('path');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包成额外的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happybabel', // 将loader换成happypack
        include: [resolve('src')], // src是项目开发的目录
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[hash].css",
      chunkFilename: '[id].[hash].css'
    }),
    // 解决vender后面的hash每次都改变
    new webpack.HashedModuleIdsPlugin(),
  ],
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
};