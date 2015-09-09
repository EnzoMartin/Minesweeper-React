var Dispatcher = require('../Dispatcher');
var RegisteredStore = require('../RegisteredStore');
var CacheItemModelFactory = require('./CacheItemModelFactory');

/**
 * Fetches an item from a given strategy. If the item is not an CacheItemModel it will be created as one.
 * @param strategy
 * @param key
 * @returns {*}
 */
function getItemFromStrategy(strategy, key) {
    var item = strategy.getItem(key);

    if (item && !CacheItemModelFactory.instanceOf(item)) {
        item = CacheItemModelFactory.create(item);
    }

    return item;
}

module.exports = {
    create: function(name, strategy, queryName, setName, touchName, removeName, purgeName, publishName, rollbackName) {
        name = name || 'CacheStoreItem';

        var Store = RegisteredStore.create(name);

        var data = {
            query: { },
            set: { },
            remove: { }
        };

        function _dispatcher(payload) {
            var item = null;
            switch(payload.actionType){
                case queryName:
                    var value = getItemFromStrategy(strategy, payload.arguments.key);

                    if (!data.query[key] || !data.query[key].equals(value)) {
                        data.query[key] = value;

                        Store.emitChange();
                    }
                    break;
                case setName:
                    item = payload.arguments.item;

                    data.set[item.key] = item;

                    // If the key has previously been marked for deletion
                    if (data.remove.hasOwnProperty(item.key)) {
                        delete data.remove[item.key];
                    }

                    Store.emitChange();
                    break;
                case touchName:
                    item = !data.remove[payload.arguments.key] ? data.set[payload.arguments.key] || data.query[payload.arguments.key] : null;

                    if (item) {
                        var clone = item.shallowClone();
                        clone.ttl = Date.now() + payload.arguments.ttl;
                        item = CacheItemModelFactory.create(clone);

                        data.set[item.key] = item;

                        Store.emitChange();
                    }
                    break;
                case removeName:
                    data.remove[payload.arguments.key] = true;

                    // If the key has previously been set with another value
                    if (data.set.hasOwnProperty(payload.arguments.key)) {
                        delete data.set[payload.arguments.key];
                    }

                    Store.emitChange();
                    break;
                case purgeName:
                    var now = Date.now();

                    Object.keys(data.query).forEach(function(key) {
                        // Only purge from query if we don't have an item pending in set.
                        if (data.query[key].expireAt != 0 && data.query[key].expireAt <= now && !data.set.hasOwnProperty(key)) {
                            strategy.removeItem(key);

                            delete data.query[key];
                        }
                    });

                    Object.keys(data.set).forEach(function(key) {
                        if (data.set[key].expireAt != 0 && data.set[key].expireAt <= now) {
                            strategy.removeItem(key);

                            delete data.set[key];
                        }
                    });

                    Store.emitChange();
                    break;
                case publishName:
                    Object.keys(data.set).forEach(function(key){
                        strategy.setItem(key, data.set[key]);
                    });

                    Object.keys(data.remove).forEach(function(key){
                        strategy.removeItem(key);
                    });

                    // Update all the items in the storage
                    Object.keys(data.query).concat(Object.keys(data.set)).forEach(function(key) {
                        var value = getItemFromStrategy(strategy, key);

                        if (!data.query[key] || !data.query[key].equals(value)) {
                            data.query[key] = value;
                        }
                    });

                    // Clear out the pending queue
                    data.set = {};
                    data.remove = {};

                    // No need to update, though data internally to the store has changed all data externally would be the same.
                    break;
                case rollbackName:
                    data.set = {};
                    data.remove = {};

                    Store.emitChange();
                    break;
            }

            return true;
        }

        strategy.registerChangeHandler(function(key, oldValue, newValue) {
            // Only update any items previously queried. The store ignores events for anything else.
            if (data.query.hasOwnProperty(key)) {
                var clone = {
                    key: key,
                    value: newValue
                };

                if (data.query[event.key]) {
                    clone = data.query[event.key].shallowClone();
                    clone.value = newValue;
                }

                var item = CacheItemModelFactory.create(clone);

                if (!data.query[event.key] || !data.query[event.key].equals(item)) {
                    data.query[event.key] = item;

                    Store.emitChange();
                }
            }
        });

        function getItem(key) {
            // If not removed, get any value in set. If no value in set, get from query.
            var item = !data.remove[key] ? data.set[key] || data.query[key] : null;

            // If the item is expired, return nothing.
            if (item && item.expireAt != 0 && item.expireAt < Date.now()) {
                item = null;
            }

            return item;
        }

        return Store.assign({
            getDebugData: function(){
                return data;
            },
            getValue: function(key) {
                var item = getItem(key);
                return item ? item.value : null;
            },
            getItem: getItem,
            dispatcherIndex: Dispatcher.register(_dispatcher)
        });
    }
};