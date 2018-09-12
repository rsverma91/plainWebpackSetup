const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        './src/js/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/'
    },
    mode: 'development',
    resolve: {
        enforceExtension: false,
        extensions: ['.js', '.json', '.scss'],
        alias: {
            '@scss': path.join(__dirname, './src/scss'),
        }
    },
    module: {
        rules: [{
                test: [/\.js?$/],
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            'loader': 'postcss-loader',
                            options: {
                                minimize: true,
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html')
        }),
    ]
}