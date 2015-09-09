var CacheStoreFactory = require('../CacheStoreFactory');
var SessionCacheConstants = require('./SessionCacheConstants');
var SessionCacheStrategy = require('./SessionCacheStrategy');

module.exports = CacheStoreFactory.create(
    'SessionCacheStore',
    SessionCacheStrategy,
    SessionCacheConstants.SESSION_CACHE_QUERY,
    SessionCacheConstants.SESSION_CACHE_SET,
    SessionCacheConstants.SESSION_CACHE_TOUCH,
    SessionCacheConstants.SESSION_CACHE_REMOVE,
    SessionCacheConstants.SESSION_CACHE_PURGE,
    SessionCacheConstants.SESSION_CACHE_PUBLISH,
    SessionCacheConstants.SESSION_CACHE_ROLLBACK
);