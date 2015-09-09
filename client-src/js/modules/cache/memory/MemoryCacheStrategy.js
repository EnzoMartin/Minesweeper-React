var CacheStrategyFactory = require('../CacheStrategyFactory');

var values = {};

module.exports = CacheStrategyFactory.create({
    getItem: function(key) {
        return values[key];
    },
    setItem: function(key,value) {
        values[key] = value;
    },
    removeItem: function(key) {
        if (values[key]) {
            delete values[key];
        }
    }
});