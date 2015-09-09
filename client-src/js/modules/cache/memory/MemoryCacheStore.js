var CacheStoreFactory = require('../CacheStoreFactory');
var MemoryCacheConstants = require('./MemoryCacheConstants');
var MemoryCacheStrategy = require('./MemoryCacheStrategy');

module.exports = CacheStoreFactory.create(
    'MemoryCacheStore',
    MemoryCacheStrategy,
    MemoryCacheConstants.MEMORY_CACHE_QUERY,
    MemoryCacheConstants.MEMORY_CACHE_SET,
    MemoryCacheConstants.MEMORY_CACHE_TOUCH,
    MemoryCacheConstants.MEMORY_CACHE_REMOVE,
    MemoryCacheConstants.MEMORY_CACHE_PURGE,
    MemoryCacheConstants.MEMORY_CACHE_PUBLISH,
    MemoryCacheConstants.MEMORY_CACHE_ROLLBACK
);