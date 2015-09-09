var Dispatcher = require('../Dispatcher');
var MutexConstants = require('./MutexConstants');

module.exports =  {
	requestMutex: function(context, identifier) {
		Dispatcher.dispatch({
			actionType: MutexConstants.REQUEST_MUTEX,
			arguments: {
				context: context,
				identifier: identifier
			}
		});
	},
    releaseMutex: function(context, identifier) {
		Dispatcher.dispatch({
			actionType: MutexConstants.RELEASE_MUTEX,
			arguments: {
				context: context,
				identifier: identifier
			}
		});
    }
};
