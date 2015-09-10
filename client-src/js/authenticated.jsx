var React = require('react');
var Router = require('./modules/router');
var Route = Router.statics.Route;
var Redirect = Router.statics.Redirect;
var DefaultRoute = Router.statics.DefaultRoute;

// Get all our statics and data
require('./Includes');

// Prep the stores and actions
var ItemActions = require('./app/game/ItemsActions');
var ItemsStore = require('./app/game/ItemsStore');

ItemActions.generateMap(40,40,3);

var routes = (
    <Route handler={require('./ui/Layout')}>
        <DefaultRoute name="game" handler={require('./ui/game/Index')}/>
        <Route name="debug" path="/debug" handler={require('./ui/debug/Index')} />
    </Route>
);

Router.initialize(routes, window.document.body);