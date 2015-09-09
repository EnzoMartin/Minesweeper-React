var async = require('async');
var logging = require('./modules/logging').logger;
var config = require('../config/server');

module.exports = {
    run: function() {
        require('./modules/web').application.listen(function(server) {
            var port = server.address().port || config.web.port;

            require('dns').lookup(require('os').hostname(), function (err, add, fam) {
                logging.info('system', 'http', 'App listening at http://' + add +':' + port);
            });
        });
    }
};