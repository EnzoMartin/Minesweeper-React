var React = require('react');
var Router = require('./Router');

var RouterActions = require('./RouterActions');
var RouterStore = require('./RouterStore');

module.exports = {
    statics: Router.statics,
    initialize: function(routes, element) {
        Router.run(routes, Router.HistoryLocation, function(Handler,state){
            RouterActions.setActiveState(state);

            React.render(<Handler/>, element);
        });
    }
};