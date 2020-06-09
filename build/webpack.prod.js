const path = require('path')
// 合并配置文件
const merge = require('webpack-merge')
const common = require('./webpack.base.js')
// 打包之前清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 压缩CSS插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 压缩CSS和JS代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const WorkboxPlugin = require('workbox-webpack-plugin') // 引入 PWA 插件

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

const config = require('./config.js')

var plugins = [
    new CleanWebpackPlugin(['dist/*'], {
        root: path.resolve(__dirname, '../'),
    }),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css',
    }),
]
// 开启pwa
if (config.openPWA) {
    plugins.push(
        // 配置 PWA
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        })
    )
}
// 开启打包后分析
if (config.showBuildReport) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info',
        })
    )
}
module.exports = merge(common, {
    optimization: {
        // 分离chunks
        splitChunks: {
            chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial', // 只打包初始时依赖的第三方
                },
            },
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                cache: true, // 开启缓存
                parallel: true, // 允许并发
                sourceMap: false, // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
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
                            name: 'imgs/[hash].[ext]',
                        },
                    },
                    // 图片压缩,这里暂时注释。如需使用图片压缩，需用 cnpm i image-webpack-loader@6.0.0 -D 安装依赖，用 npm 会报命令错误，可能是权限问题；然后取消下面的注释即可
                    /*{
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75,
                            },
                        },
                    },*/
                ],
            },
        ],
    },
    plugins: plugins,
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
    },
})
