var Dispatcher = require('../Dispatcher');
var Router = require('./Router');
var RouterConstants = require('./RouterConstants');
var RouterStateModelFactory = require('./RouterStateModelFactory');

module.exports = {
    setActiveState: function(activeState) {
        Dispatcher.dispatch({
            actionType: RouterConstants.SET_ACTIVE_STATE,
            arguments: {
                activeState: RouterStateModelFactory.create(activeState)
            }
        });
    },
    transitionTo: function(to, params, query) {
        Router.transitionTo(to, params, query);
    }
};