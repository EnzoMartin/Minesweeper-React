var config = require('../../config/server');

var expressWinston = require('express-winston');
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(config.logging.console)
    ]
});

var errorConfig = config.logging.error || {};
var requestConfig = config.logging.request || {};

requestConfig.winstonInstance = logger;
errorConfig.winstonInstance = logger;

module.exports = {
    expressIntegration: {
        request: expressWinston.logger(requestConfig),
        error: expressWinston.errorLogger(errorConfig)
    },
    logger: logger
};
