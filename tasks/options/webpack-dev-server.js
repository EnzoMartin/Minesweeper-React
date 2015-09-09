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