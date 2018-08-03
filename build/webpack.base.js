const webpack = require('webpack');
// vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HappyPack = require('happypack');
const { resolve } = require('path');
// const os = require('os');
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const path = require('path');

/* const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包成额外的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); */

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      /* {
        test: /\.js$/,
        loader: 'happypack/loader?id=happybabel', // 将loader换成happypack
        include: [resolve('src')], // src是项目开发的目录
        exclude: /node_modules/
      }, */
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
    }),
    // new HappyPack({
    //   id: 'happybabel',
    //   loaders: ['babel-loader?cacheDirectory=true'],
    //   threadPool: happyThreadPool,
    //   verbose: true
    // }),
    // new webpack.HashedModuleIdsPlugin(),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: "css/[name].[hash].css",
    //   chunkFilename: '[id].[hash].css'
    // }),
    // // 解决vender后面的hash每次都改变
    // new webpack.HashedModuleIdsPlugin(),
  ],
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('../src'),
    }
  }
};