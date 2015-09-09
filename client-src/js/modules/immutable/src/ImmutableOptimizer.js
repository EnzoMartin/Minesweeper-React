var ImmutableFreezer = require('./ImmutableFreezer');

function ImmutableOptimizer() { }

/**
 * Optimizes the equals method for the object by placing a __immutable_optimizer_keys property onto the object
 * @param obj The object to optimize for equals method
 * @returns {Object} The passed in object with the __immutable_optimizer_keys property attached.
 */
ImmutableOptimizer.prototype.model = function(obj) {
    if (!ImmutableFreezer.isFrozen(obj)) {
        Object.defineProperty(obj, '__immutable_optimizer_keys', {
            value: Object.keys(obj)
        });
        ImmutableFreezer.freeze(obj['__immutable_optimizer_keys']);
    } else if ("production" != "development") {
        console.error('ImmutableOptimizer.equals cannot optimize a frozen object, the keys cannot be appended to the "__keys" property.');
    }

    return obj;
};

module.exports = new ImmutableOptimizer();