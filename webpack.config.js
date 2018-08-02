'use strict';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const devMode = process.env.NODE_ENV !== 'production';
const publicPath = '/';

module.exports = {
    //https://webpack.js.org/configuration/

    context: __dirname,  //The base directory, an absolute path, for resolving entry points and loaders from configuration

    devtool: devMode ? 'cheap-module-eval-source-map' : false, //This option controls if and how source maps are generated, //This option controls if and how source maps are generated

    mode: devMode ? 'development' : 'production',

    // Configure how performance hints are shown. For example if you have an asset that is over 250kb,
    // webpack will emit a warning notifying you of this.
    performance: {
        assetFilter: function (assetFilename) { //применяеться фильтр только для файлов js
            return assetFilename.endsWith('.js');
        },
        hints: false
    },


    entry: [ //The point or points to enter the application
        // "babel-polyfill",
        './react/index'
    ],

    output: {
        filename: 'static/js/[name].js',
        publicPath: publicPath,
        path: path.resolve(__dirname, 'public'),
    },

    stats: {
        children: false,
        entrypoints: false,
        modules: false,
    },

    module: { //These options determine how the different types of modules within a project will be treated
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'react'),
                // exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react', 'stage-0'],
                            plugins: ['transform-runtime', 'transform-decorators-legacy']
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            // quiet: true, //Loader will process and report errors only and ignore warnings if this option is set to true
                            // emitError: true,
                            failOnWarning: true
                        }
                    }
                ]
            },


            {
                test: /\.s?[ac]ss$/,
                include: [
                    path.resolve(__dirname, 'react'),
                    path.resolve(__dirname, 'node_modules/font-awesome'),
                    path.resolve(__dirname, 'node_modules/react-image-gallery')
                ],
                use: [

                    MiniCssExtractPlugin.loader,

                    {
                        // позволяет импортировать CSS внутрь javascript-модуля
                        // The css-loader interprets @import and url() like import/require() and will resolve them.
                        // Currently, cssnano is bundled with css-loader, so you don't need to load it yourself.
                        // However, you can also use cssnano explicitly with postcss-loader
                        loader: 'css-loader',
                        options: {
                            //allows to configure how many loaders before css-loader should be applied to @imported resources
                            importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            minimize: !devMode //If true -> minimize
                        }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [

                                autoprefixer({
                                    browsers: [
                                        '>5%',
                                        'last 2 versions',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],


                                }),


                            ]
                        }

                    },

                    'sass-loader'
                ]
            },
            {
                test: /\.eot|ttf|woff2?(\?v=\d+\.\d+\.\d+)?|\w*font\w*\.svg$/,
                include: [
                    path.resolve(__dirname, 'react'),
                    path.resolve(__dirname, 'node_modules/font-awesome')
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'static/fonts/[name].[ext]',
                    },
                },
            },
            {
                test: /\.jpe?g|png|svg$/,
                include: [
                    path.resolve(__dirname, 'react')
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'static/images/[name].[ext]',
                    }
                }
            }
        ]
    },

    plugins: [

        //экспорт стилей из js в отдельный файл
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),

        //A webpack plugin to remove/clean your build folder(s) before building
        new CleanWebpackPlugin(['public/static'], {dry: devMode, verbose: !devMode})

    ]

};