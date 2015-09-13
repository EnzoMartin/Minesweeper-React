var React = require('react');
var Router = require('./modules/router');
var Route = Router.statics.Route;
var Redirect = Router.statics.Redirect;
var DefaultRoute = Router.statics.DefaultRoute;

// Get all our statics and data
require('./Includes');

// Prep the stores and actions
var PlayerActions = require('./app/game/PlayerActions');
var ItemsStore = require('./app/game/ItemsStore');
var PlayerStore = require('./app/game/PlayerStore');

//TODO: Remove this when done debugging
PlayerActions.generateMap(10,10,1);

var routes = (
    <Route handler={require('./ui/Layout')}>
        <DefaultRoute name="game" handler={require('./ui/game/Index')}/>
        <Route name="debug" path="/debug" handler={require('./ui/debug/Index')} />
    </Route>
);

Router.initialize(routes, window.document.body);