var React = require('react');
var Router = require('./modules/router');
var Route = Router.statics.Route;
var DefaultRoute = Router.statics.DefaultRoute;
var NotFoundRoute = Router.statics.NotFoundRoute;

// Get all our statics
require('./Includes');

var routes = (
    <Route handler={require('./ui/auth/Layout')}>
        <NotFoundRoute handler={require('./ui/auth/login/Index')} />
        <DefaultRoute handler={require('./ui/auth/login/Index')} />
    </Route>
);

window.document.body.setAttribute('id', 'login');
Router.initialize(routes, window.document.body);
