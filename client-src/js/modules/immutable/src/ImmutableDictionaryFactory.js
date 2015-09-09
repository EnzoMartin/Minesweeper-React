var ImmutableFreezer = require('./ImmutableFreezer');
var ImmutableModelFactory = require('./ImmutableModelFactory');
var ImmutableGenericModelFactory = require('./ImmutableGenericModelFactory');
var EnumerableTransactionFactory = require('./EnumerableTransactionFactory');

var ImmutableDictionary = ImmutableModelFactory.extend(function ImmutableDictionary(items) {
    items = items && items instanceof Object ? items : {};

    /**
     * The keys to access the dictionary
     * @type {Array}
     */
    this.keys = Object.keys(items);

    /**
     * The underlying frozen array of values in the dictionary
     * @type {Array}
     */
    this.values = [];

    /**
     * How many items are in the dictionary
     * @type {Number}
     */
    this.length = this.keys.length;

    /**
     * Mapping between key and index position in the array
     */
    this.keyToIndex = {};
    
    for (var offset = 0; offset < this.length; offset++) {
        if (!ImmutableModelFactory.instanceOf(items[this.keys[offset]])) {
            this.values.push(ImmutableGenericModelFactory.create(items[this.keys[offset]]));
        } else {
            this.values.push(items[this.keys[offset]]);
        }

        this.keyToIndex[this.keys[offset]] = offset;
    }

    // Note: The assumption is on the item values to have been frozen themselves.
    // We just provide an immutable dictionary that can't have items added/taken.
    ImmutableFreezer.freeze(this);
    ImmutableFreezer.freeze(this.values);
    ImmutableFreezer.freeze(this.keyToIndex);
    ImmutableFreezer.freeze(this.keys);
});

ImmutableDictionary.prototype.cloneItems = function() {
    var cloned = {};

    this.keys.forEach(function(key) {
        cloned[key] = this.values[this.keyToIndex[key]];
    }, this);

    return cloned;
};

/**
 * Depth search the dictionary for equality. This should be faster than creating a new immutable dictionary
 * depending on the number of items in the dictionary
 * @param other
 * @returns {boolean}
 */
ImmutableDictionary.prototype.equals = function(other) { // todo assumes other is ImmutableDictionary
    var equals = false;

    if (this !== other) {
        var equality = true;
        var offset = 0;

        if (other && other instanceof ImmutableDictionary) {
            // If we don't have the same number of items then we can't be equal
            if (this.length === other.length) {

                for (offset = 0; offset < this.length && equality; offset++) {
                    equality = this.values[this.keyToIndex[this.keys[offset]]].equals(other.values[other.keyToIndex[this.keys[offset]]]);
                }

                if (equality) {
                    // Everything is equal
                    equals = equality;
                }
            }
        } else if (other && other instanceof Object) {
            var keys = Object.keys(other);

            // If we don't have the same number of items then we can't be equal
            if (this.length === keys.length) {
                for (offset = 0; offset < this.length && equality; offset++) {
                    equality = this.values[this.keyToIndex[this.keys[offset]]].equals(other[this.keys[offset]]);
                }

                if (equality) {
                    // Everything is equal
                    equals = equality;
                }
            }
        }
    } else {
        // Identical object, they are equal.
        equals = true;
    }

    return equals;
};

ImmutableDictionary.prototype.map = function(callback, thisArg) {
    return this.keys.map(function(key) {
        return callback.call(thisArg, this.values[this.keyToIndex[key]], key, this.values);
    }, this);
};

ImmutableDictionary.prototype.reduce = function(callback, initialValue) {
    var reduced = initialValue;

    this.keys.forEach(function(key) {
        reduced = callback(reduced, this.values[this.keyToIndex[key]], key, this.values);
    }, this);

    return reduced;
};

ImmutableDictionary.prototype.find = function(predicate, thisArg) {
    var value = undefined;
    var key = null;

    for (var offset = 0; offset < this.keys.length && !value; offset++) {
        key = this.keys[offset];
        if (predicate.call(thisArg, this.values[this.keyToIndex[key]], key, this.values)) {
            value = this.values[this.keyToIndex[key]];
        }
    }

    return value;
};

ImmutableDictionary.prototype.forEach = function(callback, thisArg) {
    return this.keys.forEach(function(key) {
        callback.call(thisArg, this.values[this.keyToIndex[key]], key, this.values);
    }, this);
};

ImmutableDictionary.prototype.filter = function(callback, thisArg) {
    return this.keys.filter(function(key) {
        return callback.call(thisArg, this.values[this.keyToIndex[key]], key, this.values);
    }, this).map(function(key) {
        return this.values[this.keyToIndex[key]];
    }, this);
};

ImmutableDictionary.prototype.every = function(callback, thisArg) {
    return this.keys.every(function(key) {
        return callback.call(thisArg, this.values[this.keyToIndex[key]], key, this.values);
    }, this);
};

ImmutableDictionary.prototype.some = function(callback, thisArg) {
    return this.keys.some(function(key) {
        return callback.call(thisArg, this.values[this.keyToIndex[key]], key, this.values);
    }, this);
};

ImmutableDictionary.prototype.sort = function(callback) {
    return this.values.slice().sort(callback);
};

// Any methods we want to proxy to the underlying values array.
// This is different from the ImmutableList because we need to edit some functions to pass back a key
// instead of an index to maintain a useful export
var methodProxies = [
    'concat',
    'join',
    'slice',
    'toLocaleString',
    'toString'
];

// Proxy all calls to this array back to the underlying array
methodProxies.forEach(function(methodName) {
    ImmutableDictionary.prototype[methodName] = function() {
        return this.values[methodName].apply(this.values, arguments);
    }
});

// Any methods that require a different api/name, or expect the dictionary to maintain an order.
var unsupportedMethods = {
    'pop': 'ImmutableDictionary: Invalid method pop, the dictionary has no order and this method lacks an indexer.',
    'push': 'ImmutableDictionary: Invalid method push, the dictionary has no order and this method lacks an indexer.',
    'shift': 'ImmutableDictionary: Invalid method shift, the dictionary has no order and this method lacks an indexer.',
    'unshift': 'ImmutableDictionary: Invalid method unshift, the dictionary has no order and this method lacks an indexer.',
    'reverse': 'ImmutableDictionary: Invalid method reverse, the dictionary has no order and this method lacks an indexer.',
    'indexOf': 'ImmutableDictionary: Invalid method indexOf, the dictionary has no order.',
    'lastIndexOf': 'ImmutableDictionary: Invalid method lastIndexOf, the dictionary has no order.',
    'splice': 'ImmutableDictionary: Invalid method splice, the dictionary has no order.',
    'reduceRight': 'ImmutableDictionary: Invalid method reduceRight, the dictionary has no order.'
};

Object.keys(unsupportedMethods).forEach(function(methodName) {
    ImmutableDictionary.prototype[methodName] = function() {
        throw new Error(unsupportedMethods[methodName]);
    }
});

/**
 * Start a transaction on the dictionary. Call commit() to apply the changes and return a new dictionary.
 * @returns {Transaction}
 */
ImmutableDictionary.prototype.transaction = function() {
    return EnumerableTransactionFactory.create({
        thisArg: this,
        values: this.cloneItems(),
        set: function(transaction, setCallback) {
            var cloned = {};
            var existingKeys = Object.keys(transaction._values);

            existingKeys.forEach(function(key) {
                cloned[key] = transaction._values[key];
            });

            var results = setCallback(cloned);

            if (results instanceof ImmutableDictionary) {
                results = results.cloneItems();
            }

            var resultsKeys = Object.keys(results);

            resultsKeys.forEach(function(key) {
                transaction.addOrUpdate(key, results[key]);
            });

            transaction.removeWhere(function(key) {
                return resultsKeys.indexOf(key) === -1;
            });
        },
        add: function(transaction, key, addCallback) {
            if (key && !transaction._values[key]) {
                transaction._values[key] = addCallback(key);

                transaction._modified = true;
            }
        },
        addOrUpdate: function(transaction, key, addCallback, updateCallback) {
            if (key) {
                if (!transaction._values[key]) {
                    transaction._values[key] = addCallback();

                    transaction._modified = true;
                } else {
                    var value = updateCallback(key, transaction._values[key]);

                    if (!transaction._values[key].equals(value)) {
                        transaction._values[key] = value;

                        transaction._modified = true;
                    }
                }
            }
        },
        update: function(transaction, key, updateCallback) {
            if (key && transaction._values[key]) {
                var value = updateCallback(key, transaction._values[key]);

                if (!transaction._values[key].equals(value)) {
                    transaction._values[key] = value;

                    transaction._modified = true;
                }
            }
        },
        removeWhere: function(transaction, whereCallback) {
            var removed = Object.keys(transaction._values).filter(function(key) {
                return whereCallback(key, transaction._values[key]);
            });

            if (removed.length > 0) {
                removed.forEach(function(key) {
                    delete transaction._values[key];
                });

                transaction._modified = true;
            }
        },
        remove: function(transaction, key) {
            if (key && transaction._values[key]) {
                delete transaction._values[key];

                transaction._modified = true;
            }
        },
        clear: function(transaction) {
            if (Object.keys(transaction._values).length) {
                transaction._values = {};

                transaction._modified = true;
            }
        },
        commit: function(transaction) {
            // Only create a new dictionary if we modified the dictionary.
            return transaction._modified ? new ImmutableDictionary(transaction._values).assertUnfrozen() : this;
        }
    });
};

/**
 * Can't overload index operator, so this will do. If you need to enumerate all of the items see .map
 * @param key
 * @returns {*}
 */
ImmutableDictionary.prototype.index = function(key) {
    return this.values[this.keyToIndex[key]];
};

module.exports = {
    create: function(items) {
        return new ImmutableDictionary(items || {}).assertUnfrozen();
    }
};