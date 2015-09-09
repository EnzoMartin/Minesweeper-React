var Dispatcher = require('../Dispatcher');
var DebugConstants = require('./DebugConstants');

module.exports = {
    registerStore: function(name, store) {
        Dispatcher.dispatch({
            actionType: DebugConstants.REGISTER_STORE,
            arguments: {
                name: name,
                store: store
            }
        });
    }
};