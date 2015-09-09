var webpack = require('webpack');
var webpackConfig = require('./webpack').options;


webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': '"development"'
    }
}));

module.exports = {
    options: {
        webpack: webpackConfig,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true
        },
        publicPath: webpackConfig.output.publicPath
    },
    start: {
        keepAlive: true,
        webpack: {
            devtool: 'eval',
            debug: true
        }
    }
};