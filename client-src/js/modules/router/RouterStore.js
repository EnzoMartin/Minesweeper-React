var Dispatcher = require('../Dispatcher');
var RouterConstants = require('./RouterConstants');
var RegisteredStore = require('../RegisteredStore');
var RouterHelpers = require('./RouterHelpers');
var Immutable = require('../immutable');

var RouterStore = RegisteredStore.create('RouterStore');

var data = {
    flattenedRoutes: Immutable.List(),
    activeState: null
};

function _dispatcher(payload) {
    switch(payload.actionType){
        case RouterConstants.SET_ACTIVE_STATE:
            if (!data.activeState || !data.activeState.equals(payload.arguments.activeState)) {
                data.activeState = payload.arguments.activeState;

                data.flattenedRoutes = Immutable.List(RouterHelpers.getFlattenedRoutes(data.activeState));

                RouterStore.emitChange();
            }

            break;
    }

    return true;
}

module.exports = RouterStore.assign({
    getDebugData: function(){
        return data;
    },
    /**
     * Fetch all routes that don't default route to another route (any routes that sit on a branch or leaf that are not essentially aliases of other routes)
     * @returns {*}
     */
    getFlattenedRoutes: function() {
        return data.flattenedRoutes;
    },
    /**
     * Fetch the parameters of the currently active route
     */
    getParams: function() {
        return data.activeState ? data.activeState.params : {};
    },
    getQuery: function() {
        return data.activeState ? data.activeState.query : {};
    },
    isRouteWithinBreadcrumb: function(routeName, params) {
        return RouterHelpers.isRouteWithinBreadcrumb(data.activeState, routeName, params);
    },
    isRouteLastOnBreadcrumb: function(routeName, params){
        return RouterHelpers.isRouteLastOnBreadcrumb(data.activeState, routeName, params);
    },
    dispatcherIndex: Dispatcher.register(_dispatcher)
});
