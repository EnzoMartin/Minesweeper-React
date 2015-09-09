var config = require('../../../config/server');
var express = require('express');
var path = require('path');
var app = require('../../modules/web/application').app;
var logging = require('../../modules/logging').logger;

app.use(express.static('public'));

var ip = 'localhost';
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    ip = add;
});

if(config.env === 'development'){
    app.use(function(req,res) {
        if(req.url.indexOf('.') === -1){
            res.sendFile(path.resolve(__dirname + '/../../templates/index.html'));
        } else {
            res.redirect('http://' + ip + ':8080' + req.url);
        }
    });
} else {
    app.use(function(req,res,next){
        if(req.url.indexOf('.') === -1){
            res.sendFile(path.resolve(__dirname + '/../../templates/index.html'));
        } else {
            next();
        }
    });
}

logging.info('system', 'http', 'Bound controller to app ' + __filename);