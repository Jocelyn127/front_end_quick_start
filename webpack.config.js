// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中所有的配置信息都应该写在module.exports中
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",
    // 指定打包文件所在的目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件名
        filename: 'bundle.js',
        // webpack不使用箭头 （IE不支持）
        environment: {
            arrowFunction: false,
            const: false
        }
        
    },
    mode: 'development',
    // 指定webpack打包时要用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // 指定规则生效的文件
                test: /\.ts$/,
                // 使用的loader
                use: [
                    // 配置babel,可以解决不同版本兼容性问题
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": 58
                                        },
                                        "corejs": "3",
                                        // 使用core.js的方式 “usage” 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/
            },
            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [

                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }

                                    ]

                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    //用来设置引用模块 
    resolve: {
        extensions: ['.ts', '.js'
        ]
    }
}