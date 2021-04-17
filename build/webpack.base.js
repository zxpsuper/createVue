const webpack = require('webpack')
const path = require('path')
// vue-loader 插件, 需配合 @vue/compiler-sfc 一块使用
const { VueLoaderPlugin } = require('vue-loader/dist/index')
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const dayjs = require('dayjs')


module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            // 处理js
            // {
            //     test: /\.js$/,
            //     //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
            //     loader: 'happypack/loader?id=happyBabel',
            //     //排除node_modules 目录下的文件
            //     exclude: /node_modules/,
            // },
            // 处理vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            // 处理字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, '../tsconfig.json'),
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        // new HardSourceWebpackPlugin(),
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        // 处理静态文件夹 static 复制到打包的 static 文件夹
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: 'static',
                },
            ]
        }),
        // 指定环境,定义环境变量，项目中暂时未用到
        new webpack.DefinePlugin({
            'process.env': {
                VUE_BASE_URL: JSON.stringify('http://localhost:9000'),
                BUILD_TIME: JSON.stringify(dayjs().format('YYYY/DD/MM HH:mm:ss')),
                __VUE_PROD_DEVTOOLS__: 'false'
            },
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.ts', '.tsx'],
        alias: {
            vue: 'vue/dist/vue.runtime.esm-browser.js',
            '@': resolve('src'),
        },
    },
}
