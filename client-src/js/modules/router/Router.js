var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var router = null;

module.exports = {
    statics: {
        Route: Route,
        Redirect: Redirect,
        DefaultRoute: DefaultRoute,
        NotFoundRoute: NotFoundRoute,
        RouteHandler: RouteHandler,
        Link: Link
    },
    run: function(routes, element, handler) {
        router = Router.run(routes, Router.HistoryLocation, handler);
    },
    transitionTo: function() {
        router && router.transitionTo.apply(this, arguments);
    }
};