var Immutable = require('../../immutable');

var id = 0;

var NotificationModel = Immutable.Model.Extend(function NotificationModel(data) {
    this.id = id++;
    this.created = Date.now();
    this.expireAt = data.expireAt;
    this.props = data.props || {};

    Immutable.Freezer.freeze(this);
});

module.exports = {
    create: function(data) {
        return new NotificationModel(data).assertUnfrozen();
    }
};