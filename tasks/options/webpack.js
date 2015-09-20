var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('../../config/webpack');

module.exports = {
    options: webpackConfig,
    production: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"production"'
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(true),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ].concat(webpackConfig.plugins),
        devtool: null
    },
    development: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"development"'
                }
            })
        ].concat(webpackConfig.plugins),
        devtool: null,
        watch: true,
        failOnError: false,
        keepalive: true
    }
};