var _ = require('lodash');

var Dispatcher = require('../Dispatcher');
var DebugConstants = require('./DebugConstants');
var Store = require('../Store');

var DebugStore = _.assign({}, Store);

var data = {
    stores: { }
};

function _dispatcher(payload) {
    switch(payload.actionType){
        case DebugConstants.REGISTER_STORE:
            data.stores[payload.arguments.name] = payload.arguments.store;

            DebugStore.emitChange();
            break;
    }

    return true;
}

module.exports = _.assign(DebugStore, {
    getStores: function() {
        return _.values(data.stores);
    },
    dispatcherIndex: Dispatcher.register(_dispatcher)
});
