var CacheStoreFactory = require('../CacheStoreFactory');
var LocalCacheConstants = require('./LocalCacheConstants');
var LocalCacheStrategy = require('./LocalCacheStrategy');

module.exports = CacheStoreFactory.create(
    'LocalCacheStore',
    LocalCacheStrategy,
    LocalCacheConstants.LOCAL_CACHE_QUERY,
    LocalCacheConstants.LOCAL_CACHE_SET,
    LocalCacheConstants.LOCAL_CACHE_TOUCH,
    LocalCacheConstants.LOCAL_CACHE_REMOVE,
    LocalCacheConstants.LOCAL_CACHE_PURGE,
    LocalCacheConstants.LOCAL_CACHE_PUBLISH,
    LocalCacheConstants.LOCAL_CACHE_ROLLBACK
);