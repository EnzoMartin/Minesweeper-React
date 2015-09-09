var Immutable = require('../immutable');
var ParamsModelFactory = require('./ParamsModelFactory');
var QueryModelFactory = require('./QueryModelFactory');

var RouteModel = Immutable.Model.Extend(function RouteModel(data) {
    this.path = data.path;
    this.name = data.name;
    this.isNotFound = data.isNotFound;
    this.isDefault = data.isDefault;
    this.ignoreScrollBehavior = data.ignoreScrollBehavior;

    this.defaultRoute = data.defaultRoute ? new RouteModel(data.defaultRoute).assertUnfrozen() : null;
    this.paramNames = (data.paramNames || []).slice();
    this.childRoutes = data.childRoutes ? data.childRoutes.map(function(route) {
        return new RouteModel(route).assertUnfrozen();
    }) : [];

    Object.freeze(this);
    Object.freeze(this.paramNames);
    Object.freeze(this.childRoutes);
});

/**
 * Checks if a route is equal, or the values are equal to another route.
 * @param other
 */
RouteModel.prototype.equals = function(other) {
    return this === other || (
            this.path === other.path &&
            this.name === other.name &&
            this.isNotFound === other.isNotFound &&
            this.isDefault === other.isDefault &&
            this.ignoreScrollBehavior === other.ignoreScrollBehavior &&
            ((!this.defaultRoute && !other.defaultRoute) || (!this.defaultRoute && this.defaultRoute.equals(other.defaultRoute))) &&
            this.paramNames.length === other.paramNames.length &&
            this.paramNames.every(function(thisParam, index) {
                return thisParam === other.paramNames[index];
            }) &&
            this.childRoutes.length === other.childRoutes.length &&
            this.childRoutes.every(function(thisRoute, index) {
                return thisRoute.equals(other.childRoutes[index]);
            })
        );
};

module.exports = {
    create: function(data) {
        return new RouteModel(data).assertUnfrozen();
    }
};