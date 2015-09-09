var env = process.env.NODE_ENV || 'development';
var port = 3000;
if(env !== 'development' && env !== 'test'){
    port = process.env.PORT || process.env.NODE_PORT || port;
}

module.exports = {
    env: env,
    web: {
        sessionPrefix: 'minesweeper',
        cookieSecret: 'kitteh',
        cookieSid: 'minesweeper.sid',
        port: port
    },
    logging: {
        console: {
            timestamp: true,
            json: false,
            prettyPrint: true,
            colorize: true
        },
        request: {
            meta: false,
            msg: '{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
            expressFormat: false,
            colorStatus: true,
            ignoreTrackingRequests: true
        }
    }
};