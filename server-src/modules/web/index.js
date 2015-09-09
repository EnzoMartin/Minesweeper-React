var logging = require('../logging').logger;

logging.info('system', 'http', 'Initiating http web server');

var application = require('./application');

// Bind common functionality
require('./parsers');

// All the other routes.
require('../../controllers/web/index');

logging.info('system', 'http', 'All controllers and modules bound');

module.exports = {
    application: application
};