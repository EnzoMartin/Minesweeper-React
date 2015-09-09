/**
 * Checks if all parameters in the active state match an object of parameters
 * @param activeState
 * @param params
 * @returns {boolean}
 */
function doParametersMatchActiveState(activeState, params) {
    var paramsMatch = true;
    var keys = Object.keys(params);

    for (var offset = 0; offset < keys.length && paramsMatch; offset++) {
        var key = keys[offset];

        paramsMatch = activeState.params[key] === '' + params[key] && paramsMatch;
    }

    return paramsMatch;
}

module.exports = {
    /**
     * Checks if a route is active anywhere in the breadcrumb
     * @param activeState
     * @param routeName
     * @param params
     * @returns {boolean}
     */
    isRouteWithinBreadcrumb: function(activeState, routeName, params) {
        var active = false;

        if (activeState) {
            var matchedRoute = null;

            for (var offset = 0; offset < activeState.routes.length && !matchedRoute; offset++) {
                if (activeState.routes[offset].name === routeName) {
                    matchedRoute = activeState.routes[offset];
                }
            }

            if (matchedRoute) {
                if (params) {
                    // The route matches (so active is essentially true) but if we have params we also need to make
                    // sure these items match.
                    active = doParametersMatchActiveState(params);
                } else {
                    active = true;
                }
            }
        }

        return active;
    },
    /**
     * Checks if the route is the final route selected (the last on the breadcrumb)
     * @param activeState
     * @param routeName
     * @param params
     * @returns {boolean}
     */
    isRouteLastOnBreadcrumb: function(activeState, routeName, params){
        var active = false;

        if (activeState && activeState.routes.length > 0) {
            var lastRoute = activeState.routes[activeState.routes.length - 1];

            if (lastRoute && lastRoute.name === routeName) {
                if (params) {
                    // The route matches (so active is essentially true) but if we have params we also need to make
                    // sure these items match.
                    active = doParametersMatchActiveState(params);
                } else {
                    active = true;
                }
            }
        }

        return active;
    },
    /**
     * Fetch all routes that don't default route to another route (any routes that sit on a branch or leaf that are not essentially aliases of other routes)
     * @returns {*}
     */
    getFlattenedRoutes: function(activeState) {
        var routes = activeState.routes;

        // Now strip any appended leafs that are aliases of their parent routes
        // "servers" [DefaultRoute] -> "servers-index" => ["servers"]
        var defaultRoutes = routes.filter(function(route) {
            return route.defaultRoute;
        }).map(function(route) {
            return route.defaultRoute;
        });

        // Filter out any routes that are in the route list, but we've previously found a route that just points to it by default.
        routes = routes.filter(function(route) {
            return defaultRoutes.indexOf(route) === -1;
        });

        // Remove all routes that have identical paths earlier in the breadcrumb (they go to the same place)
        routes = routes.filter(function(route) {
            var isUniquePath = true;

            // Start at the route before this one, go backwards looking for an identical path.
            for (var offset = routes.indexOf(route) - 1; offset >= 0 && isUniquePath; offset--) {
                isUniquePath = routes[offset].path !== route.path;
            }

            return isUniquePath;
        });

        return routes;
    }
};