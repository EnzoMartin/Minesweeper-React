var Immutable = require('../immutable');

var CacheItemModel = Immutable.Model.Extend(function CacheItem(data) {
    this.key = data.key || '';
    this.value = data.value || '';
    this.expireAt = data.expireAt || 0;

    Immutable.Freezer.freeze(this);
    Immutable.Freezer.freeze(this.value);
});

module.exports = {
    create: function(data) {
        return new CacheItemModel(data).assertUnfrozen();
    },
    instanceOf: function(other) {
        return other instanceof CacheItemModel;
    }
};