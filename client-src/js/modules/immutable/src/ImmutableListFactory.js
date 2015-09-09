var ImmutableFreezer = require('./ImmutableFreezer');
var ImmutableModelFactory = require('./ImmutableModelFactory');
var ImmutableGenericModelFactory = require('./ImmutableGenericModelFactory');
var EnumerableTransactionFactory = require('./EnumerableTransactionFactory');

var ImmutableList = ImmutableModelFactory.extend(function ImmutableList(items) {
    items = items && items instanceof Array ? items : [];

    this.values = [];
    this.length = items.length;

    for (var offset = 0; offset < this.length; offset++) {
        if (!ImmutableModelFactory.instanceOf(items[offset])) {
            this.values.push(ImmutableGenericModelFactory.create(items[offset]));
        } else {
            this.values.push(items[offset]);
        }
    }

    // Note: The assumption is on the item values to have been frozen themselves.
    // We just provide an immutable list that can't have items added/taken.
    ImmutableFreezer.freeze(this);
    ImmutableFreezer.freeze(this.values);
});

ImmutableList.prototype.cloneItems = function() {
    return this.values.slice();
};

/**
 * Depth search the array for equality. This should be faster than creating a new immutable list
 * depending on the number of items in the array
 * @param other
 * @returns {boolean}
 */
ImmutableList.prototype.equals = function(other) {
    var equals = false;

    if (this !== other) {
        if (other && other instanceof Object) {
            var otherValues = other instanceof ImmutableList ? other.values : other;

            // If we don't have the same number of items then we can't be equal
            if (this.length === other.length) {
                var equality = true;

                for (var offset = 0; offset < this.length && equality; offset++) {
                    equality = this.values[offset].equals(otherValues[offset]);
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

// Any methods we want to proxy to the underlying array. Essentially anything that does not mutate the array is passed through.
var methodProxies = [
    'concat',
    'every',
    'filter',
    'forEach',
    'indexOf',
    'join',
    'lastIndexOf',
    'map',
    'reduce',
    'reduceRight',
    'slice',
    'some',
    'toLocaleString',
    'toString'
];

// Proxy all calls to this array back to the underlying array
methodProxies.forEach(function(methodName) {
    ImmutableList.prototype[methodName] = function() {
        return this.values[methodName].apply(this.values, arguments);
    }
});

// Use the method if we find it and proxy to the underlying array, or use our definition if it's not there.
var polyfillMethodProxies = {
    'find': function(predicate, thisArg) {
        var value = undefined;

        for (var offset = 0; offset < this.length && !value; offset++) {
            if (predicate.call(thisArg, this[offset], offset, this)) {
                value = this[offset];
            }
        }

        return value;
    }
};

Object.keys(polyfillMethodProxies).forEach(function(methodName) {
    ImmutableList.prototype[methodName] = function() {
        return (this.values[methodName] || polyfillMethodProxies[methodName]).apply(this.values, arguments);
    }
});

// All methods that mutate the array in-place need to instead edit a copy of the array and return a new ImmutableList
var methodOverrides = [
    'pop',
    'push',
    'shift',
    'unshift',
    'reverse',
    'splice',
    'sort'
];

methodOverrides.forEach(function(methodName) {
    ImmutableList.prototype[methodName] = function() {
        var items = this.values.slice();

        items[methodName].apply(items, arguments);

        return new ImmutableList(items).assertUnfrozen();
    };
});

/**
 * Start a transaction on the dictionary. Call commit() to apply the changes and return a new dictionary.
 * @returns {Transaction}
 */
ImmutableList.prototype.transaction = function() {
    return EnumerableTransactionFactory.create({
        thisArg: this,
        values: this.cloneItems(),
        set: function(transaction, setCallback) {
            // todo this is a very simplistic answer to this problem that should be improved upon.
            // While it provides the results it will edit all items in the array if you insert an item at the start
            // of the array.

            var results = setCallback(transaction._values.slice());

            if (results instanceof ImmutableList) {
                results = results.cloneItems();
            }

            results.forEach(function(item, index) {
                transaction.addOrUpdate(index, item);
            });

            // If we have too many items
            if (transaction._values.length > results.length) {
                transaction.removeWhere(function(index) {
                    return index > results.length - 1;
                });
            }
        },
        add: function(transaction, index, addCallback) {
            transaction._values.push(addCallback(index));

            transaction._modified = true;
        },
        addOrUpdate: function(transaction, index, addCallback, updateCallback) {
            if (index >= 0 && transaction._values[index]) {
                var value = updateCallback(index, transaction._values[index]);

                if (!transaction._values[index].equals(value)) {
                    transaction._values[index] = value;

                    transaction._modified = true;
                }
            } else {
                transaction._values.push(addCallback(index));

                transaction._modified = true;
            }
        },
        update: function(transaction, index, updateCallback) {
            if (index >= 0 && transaction._values[index]) {
                var value = updateCallback(index, transaction._values[index]);

                if (!transaction._values[index].equals(value)) {
                    transaction._values[index] = value;

                    transaction._modified = true;
                }
            }
        },
        removeWhere: function(transaction, whereCallback) {
            // The new array with all the values passing the predicate removed.
            var filtered = transaction._values.filter(function(value, index) {
                return !whereCallback(index, value);
            });

            // If some items were removed
            if (filtered.length != transaction._values.length) {
                transaction._values = filtered;

                transaction._modified = true;
            }
        },
        remove: function(transaction, index) {
            if (index >= 0 && transaction._values[index]) {
                transaction._values.splice(index, 1);

                transaction._modified = true;
            }
        },
        clear: function(transaction) {
            if (transaction._values.length) {
                transaction._values = [];

                transaction._modified = true;
            }
        },
        commit: function(transaction) {
            // Only create a new array if we modified the array.
            return transaction._modified ? new ImmutableList(transaction._values).assertUnfrozen() : this;
        }
    });
};

/**
 * Can't overload index operator, so this will do. If you need to enumerate all of the items see .map
 * @param index
 * @returns {*}
 */
ImmutableList.prototype.index = function(index) {
    return this.values[index];
};

module.exports = {
    create: function(items) {
        return new ImmutableList(items || []).assertUnfrozen();
    }
};