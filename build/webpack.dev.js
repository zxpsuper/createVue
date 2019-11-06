const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');
const open = require('opn'); //打开浏览器
const chalk = require('chalk'); // 改变命令行中输出日志颜色插件

module.exports = merge(common, {
    devtool: 'inline-source-map',
    stats: 'errors-only',
    devServer: {
        port: 8080,
        contentBase: '../dist',
        host: '0.0.0.0',
        overlay: true,
        after() {
            open('http://localhost:' + this.port)
                .then(() => {
                    console.log(
                        chalk.cyan(
                            '成功打开链接： http://localhost:' + this.port
                        )
                    );
                })
                .catch(err => {
                    console.log(chalk.red(err));
                });
        },
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            name: 'imgs/[name].[ext]',
                            // publicPath: '../'
                        },
                    },
                ],
            },
        ],
    },
    mode: 'development',
});
