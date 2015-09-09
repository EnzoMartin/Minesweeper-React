var TransactionUtils = require('./TransactionUtils');

/**
 * @class Transaction
 */
function Transaction(data) {
    this._thisArg = data.thisArg || this;
    this._setCallback = data.set || function() {};
    this._commitCallback = data.commit || function() {};
    this._modifications = [];
    this._modified = false;
    this._value = data.value;
}

/**
 * Called to resolve the value for a set modification
 * @callback Transaction~setCallback
 * @param {string} [name] The name of the property being modified
 * @param {*} existingValue The existing value of the property
 * @returns {*} The new value of the property
 */

/**
 * Set a value on the model
 * @param {*|Object} name The name of the property to modify
 * @param {*|Transaction~setCallback} setCallback A function to resolve an item or the item to be added. If a string is provided then only that single property will be modified
 * @returns {Transaction}
 */
Transaction.prototype.set = function(name, setCallback) {
    var keys = [];
    var map = {};

    if (typeof name === 'string') {
        keys.push(name);

        map[name] = TransactionUtils.wrapValueCallback(setCallback, [setCallback]);
    } else if (name && name instanceof Object && TransactionUtils.isNullOrUndefined(setCallback)) {
        keys = Object.keys(name);

        keys.forEach(function(key) {
            map[key] = TransactionUtils.wrapValueCallback(name[key], [name[key]])
        });
    }

    this._modifications.push(this._setCallback.bind(this._thisArg, this, keys, map));

    return this;
};

/**
 * Called with the raw data of the modified model.
 * @callback Transaction~commitCallback
 * @param {*} rawData The shallow cloned model with all of the modifications applied.
 * @returns {ImmutableModel} The new model created from the rawData.
 */

/**
 * Commit the changes of the transaction,
 * @param {Transaction~commitCallback} [commitCallback] A method used to create the object if changes are required. If nothing is provided than the constructor of the existing object is used.
 * @returns A new model with all the changes applied, or the original model if no changes were required.
 */
Transaction.prototype.commit = function(commitCallback) {
    // Note that this._modifications.length can potentially grow while enumerating.
    for (var offset = 0; offset < this._modifications.length; offset++) {
        this._modifications[offset]();
    }

    return this._commitCallback.call(this._thisArg, this, commitCallback);
};

module.exports = {
    create: function(data) {
        if (!data) throw new Error('Missing parameter "data"');
        return new Transaction(data);
    }
};