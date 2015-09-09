var Dispatcher = require('../Dispatcher');
var NotificationsConstants = require('./NotificationsConstants');
var NotificationModelFactory = require('./NotificationModelFactory');

module.exports = {
    appendNotification: function(notification) {
        Dispatcher.dispatch({
            actionType: NotificationsConstants.APPEND_NOTIFICATION,
            arguments: {
                notification: notification
            }
        });
    },
    createAndAppendNotification: function(props, expireAt) {
        expireAt = expireAt || Math.ceil(Date.now() / 1000) * 1000 + 10000;

        Dispatcher.dispatch({
            actionType: NotificationsConstants.APPEND_NOTIFICATION,
            arguments: {
                notification: NotificationModelFactory.create({
                    props: props,
                    expireAt: expireAt
                })
            }
        });
    },
    deleteNotification: function(notificationId) {
        Dispatcher.dispatch({
            actionType: NotificationsConstants.DELETE_NOTIFICATION,
            arguments: {
                notificationId: notificationId
            }
        });
    },
    purgeExpiredNotifications: function() {
        Dispatcher.dispatch({
            actionType: NotificationsConstants.PURGE_EXPIRED_NOTIFICATIONS
        });
    }
};