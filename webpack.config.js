//webpack.config.js
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: [
                "./assets/js/app.js",
                "./assets/scss/app.scss"
            ]
        },
        mode: 'development',
        watch: true,
        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
            path: path.resolve(__dirname, 'assets/dist'),
            publicPath: "/wp-content" + __dirname
                    .split('/wp-content')
                    .pop()
                    .replace(/\s*/g,'') +
                "/assets/dist/"
        },
        module: {
            rules: [
                {
                    test: /\.(sass|scss)$/,
                    loader: ExtractTextPlugin.extract({
                        use: ['css-loader','sass-loader']
                    }),
                    exclude: /node_modules/
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader"
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["env", {
                                    "targets": {
                                        "node": "current"
                                    }
                                }]
                            ]
                        }
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery"
            }),

            new ExtractTextPlugin({
                filename: '[name].bundle.css',
                allChunks: true
            }),

            new BrowserSyncPlugin({
                proxy: 'http://localhost:9000',
                files: [
                    {
                        match: [
                            '**/*.php'
                        ],
                        fn: function(event, file) {
                            if (event === "change") {
                                const bs = require('browser-sync').get('bs-webpack-plugin');
                                bs.reload();
                            }
                        }
                    }
                ]
            },
            {
                reload: true
            })
        ]
    }
};