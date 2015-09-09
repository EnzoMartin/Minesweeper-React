var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logging = require('../logging').logger;
var Winston = require('../logging');

var config = require('../../../config/server');
var app = require('./application').app;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser(config.web.cookieSecret));

app.use(Winston.expressIntegration.request);
app.use(Winston.expressIntegration.error);

module.exports = { };

logging.info('system', 'http', 'Bound module to app ' + __filename);