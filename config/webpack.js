var path = require('path');
var webpack = require('webpack');

var loaders = [
    {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
    },
    {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
    },
    {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass'
    },
    {
        test: /\.json$/,
        loader: 'json'
    },
    {
        test: /\.jsx$/,
        loader: 'jsx?harmony',
        exclude: /node_modules/
    },
    {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.wav$|\.mp3$|\.txt$/,
        loader: 'file'
    },
    {
        test: /\.js$|\.jsx$/,
        loader: 'transform?envify',
        exclude: /node_modules/
    }
];

if(process.env.NODE_ENV === 'development'){
    loaders.push({
        test: /\.js$|\.jsx$/,
        loader: 'strict',
        exclude: /node_modules/
    });
}

/**
 * @name webpack config
 */
module.exports = {
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'shared'
        })
    ],
    entry: {
        shared: [
            'async',
            'events',
            'flux',
            'lodash',
            'moment',
            'react',
            'react-router',

            './client-src/scss/structure.scss'
        ],
        authenticated: [
            './client-src/js/authenticated.jsx'
        ],
        login: [
            './client-src/js/login.jsx'
        ]
    },
    module: {
        loaders: loaders
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: './public'
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.json',
            '.jsx'
        ]
    },
    node: {
        fs: "empty"
    }
};