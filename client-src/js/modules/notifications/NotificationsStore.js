var Dispatcher = require('../Dispatcher');
var RegisteredStore = require('../RegisteredStore');
var NotificationsConstants = require('./NotificationsConstants');
var Immutable = require('../immutable');

var NotificationsStore = RegisteredStore.create('NotificationsStore');

var data = {
    notifications: Immutable.List()
};

function _dispatcher(payload) {
    switch(payload.actionType) {
        case NotificationsConstants.APPEND_NOTIFICATION:
            data.notifications = data.notifications
                .transaction()
                .add(payload.arguments.notification)
                .commit();

            NotificationsStore.emitChange();
            break;
        case NotificationsConstants.DELETE_NOTIFICATION:
            data.notifications = data.notifications
                .transaction()
                .removeWhere(function(index, model) {
                    return model.id === payload.arguments.notificationId;
                })
                .commit();

            NotificationsStore.emitChange();
            break;
        case NotificationsConstants.PURGE_EXPIRED_NOTIFICATIONS:
            var now = Date.now();

            data.notifications = data.notifications
                .transaction()
                .removeWhere(function(key, model) {
                    return model.expireAt <= now;
                })
                .commit();

            NotificationsStore.emitChange();
            break;
    }

    return true;
}

module.exports = NotificationsStore.assign({
    getDebugData: function(){
        return data;
    },
    getNotifications: function(){
        return data.notifications;
    },
    dispatcherIndex: Dispatcher.register(_dispatcher)
});
