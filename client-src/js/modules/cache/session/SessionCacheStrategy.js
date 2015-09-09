var CacheStrategyFactory = require('../CacheStrategyFactory');

var storage = sessionStorage || {};

module.exports = CacheStrategyFactory.create({
    getItem: function(key) {
        var item = storage.getItem(key);

        try {
            item = JSON.parse(item);
        } catch (e) { } // Other plugins/scripts may be using the storage, so we can't assume it'll always parse JSON

        return item;
    },
    setItem: function(key, value) {
        storage.setItem(key, JSON.stringify(value));
    },
    removeItem: storage.removeItem,
    registerChangeHandler: function(callback) {
        window.addEventListener('storage', function(event) {
            var oldValue = event.oldValue;
            var newValue = event.newValue;

            try {
                oldValue = JSON.parse(oldValue);
            } catch (e) { }// Other plugins/scripts may be using the storage, so we can't assume it'll always parse JSON

            try {
                newValue = JSON.parse(newValue);
            } catch (e) { }// Other plugins/scripts may be using the storage, so we can't assume it'll always parse JSON

            callback(event.key, oldValue, newValue);
        });
    }
});