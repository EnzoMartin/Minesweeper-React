var config = require('../../../config/server');
var express = require('express');
var app = express();
var http = require('http');

var server = null;

module.exports = {
    app: app,

    listen: function(callback) {
        callback = callback || function() { };

        var server = http.createServer(app);
        server.listen(config.web.port,function(){
            callback(server);
        });
    }
};