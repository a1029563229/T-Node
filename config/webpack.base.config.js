const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '..', './index.ts'),
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'webpack.bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.join(__dirname, '..')
        }
    },
    resolveLoader: {// 配置查找loader的目录
        modules: [
            'node_modules',
            path.resolve(__dirname, '../', './packages')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/transform-runtime']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'tjx-loader',
                        options: {
                            plain: true
                        }
                    }
                ]
            },
            {
                test: /.tjx$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'tjx-element-loader'
                    },
                    {
                        loader: 'tjx-loader',
                        options: {
                            plain: true
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: '3500'
    },
    stats: 'errors-only',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ template: path.join(__dirname, '..', 'index.html') })
    ]
}