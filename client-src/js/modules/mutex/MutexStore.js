var Dispatcher = require('../Dispatcher');
var MutexConstants = require('./MutexConstants');
var RegisteredStore = require('../RegisteredStore');

var MutexStore = RegisteredStore.create('MutexStore');

var data = {
    contexts: {}
};

function _dispatcher(payload) {
	switch(payload.actionType) {
        case MutexConstants.REQUEST_MUTEX:
            if (!data.contexts[payload.arguments.context] && payload.arguments.identifier) {
                data.contexts[payload.arguments.context] = payload.arguments.identifier;

                MutexStore.emitChange();
            }
            break;
        case MutexConstants.RELEASE_MUTEX:
            if (data.contexts[payload.arguments.context] && data.contexts[payload.arguments.context] === payload.arguments.identifier) {
                delete data.contexts[payload.arguments.context];

                MutexStore.emitChange();
            }
            break;
	}

	return true;
}


module.exports = MutexStore.assign({
    getDebugData: function(){
        return data;
    },
    hasMutex: function(context, identifier) {
        return data.contexts[context] && data.contexts[context] === identifier;
    },
    dispatcherIndex: Dispatcher.register(_dispatcher)
});