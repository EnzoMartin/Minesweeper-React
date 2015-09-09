var Dispatcher = require('../../Dispatcher');
var MemoryCacheConstants = require('./MemoryCacheConstants');
var CacheItemModelFactory = require('../CacheItemModelFactory');

module.exports =  {
    /**
     * Query the underlying store to populate the cache with the value found for the key
     * @param key
     */
    query: function(key) {
        Dispatcher.dispatch({
            actionType: MemoryCacheConstants.MEMORY_CACHE_QUERY,
			arguments: {
				key: key
			}
        });
    },
    /**
     * Sets an item in the stores cache. You must call publish() to modify the underlying store.
     * @param key
     * @param value
     * @param ttl
     */
	set: function(key, value, ttl) {
		Dispatcher.dispatch({
			actionType: MemoryCacheConstants.MEMORY_CACHE_SET,
			arguments: {
                item: CacheItemModelFactory.create({
                    key: key,
                    value: value,
                    expireAt: ttl ? Date.now() + ttl : 0
                })
			}
		});
	},
    /**
     * Touch an item giving it a new cache expiry
     * @param key
     * @param ttl
     */
    touch: function(key, ttl) {
        Dispatcher.dispatch({
            actionType: MemoryCacheConstants.MEMORY_CACHE_TOUCH,
            arguments: {
                key: key,
                ttl: ttl
            }
        });
    },
    /**
     * Removes an item from the stores cache. You must call publish() to modify the underlying store.
     * @param key
     */
    remove: function(key) {
        Dispatcher.dispatch({
            actionType: MemoryCacheConstants.MEMORY_CACHE_REMOVE,
            arguments: {
                key: key
            }
        });
    },
    /**
     * Purge expired items from the store.
     */
    purge: function() {
        Dispatcher.dispatch({
            actionType: MemoryCacheConstants.MEMORY_CACHE_PURGE
        });
    },
    /**
     * Publish all modifications to keys (set/remove) to the underlying store
     */
    publish: function() {
        Dispatcher.dispatch({
            actionType: MemoryCacheConstants.MEMORY_CACHE_PUBLISH
        });
    },
    /**
     * Rollback all modifications to the store
     */
    rollback: function() {
        Dispatcher.dispatch({
            actionType: MemoryCacheConstants.MEMORY_CACHE_ROLLBACK
        });
    }
};
