var Immutable = require('../immutable');
var ParamsModelFactory = require('./ParamsModelFactory');
var QueryModelFactory = require('./QueryModelFactory');
var RouteModelFactory = require('./RouteModelFactory');

var RouterStateModel = Immutable.Model.Extend(function RouterStateModel(data) {
    this.action = data.action;
    this.path = data.path;
    this.pathname = data.pathname;
    this.params = ParamsModelFactory.create(data.params || {});
    this.query = QueryModelFactory.create(data.query || {});
    this.routes = (data.routes || []).map(RouteModelFactory.create);

    Object.freeze(this);
    Object.freeze(this.routes);
});

/**
 * Checks if a state is equal, or the values are equal to another state.
 * @param other
 */
RouterStateModel.prototype.equals = function(other) {
    return this === other || (
            this.action === other.action &&
            this.path === other.path &&
            this.pathname === other.pathname &&
            this.params.equals(other.params) &&
            this.query.equals(other.query) &&
            this.params.equals(other.params) &&
            this.routes.length === other.routes.length &&
            this.routes.every(function(thisRoute, index) {
                return thisRoute.equals(other.routes[index]);
            })
        );
};

module.exports = {
    create: function(data) {
        return new RouterStateModel(data).assertUnfrozen();
    }
};