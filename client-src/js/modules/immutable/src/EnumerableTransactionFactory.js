var TransactionUtils = require('./TransactionUtils');

/**
 * @class EnumerableTransaction
 */
function EnumerableTransaction(data) {
    this._thisArg = data.thisArg || this;
    this._setCallback = data.set || function() {};
    this._addCallback = data.add || function() {};
    this._addOrUpdateCallback = data.addOrUpdate || function() {};
    this._updateCallback = data.update || function() {};
    this._removeWhereCallback = data.removeWhere || function() {};
    this._removeCallback = data.remove || function() {};
    this._clearCallback = data.clear || function() {};
    this._commitCallback = data.commit || function() {};
    this._modifications = [];
    this._modified = false;
    this._values = data.values;
}

/**
 * Called when an item is available to be added to the collection to fetch what needs to be added
 * @callback EnumerableTransaction~setCallback
 * @param {Object|Array} value The raw value known to the transaction. Will contain all the changes currently made by the transaction.
 * @returns {Object|Array}
 */

/**
 * Sets the collection to the supplied value
 * @param {Object|Array|EnumerableTransaction~setCallback} setCallback A function to resolve a value to assign to the collection
 * @returns {EnumerableTransaction}
 */
EnumerableTransaction.prototype.set = function(setCallback) {
    var wrappedSetCallback = TransactionUtils.wrapValueCallback(setCallback, [setCallback]);

    this._modifications.push(this._setCallback.bind(this._thisArg, this, wrappedSetCallback));

    return this;
};

/**
 * Called when an item is available to be added to the collection to fetch what needs to be added
 * @callback EnumerableTransaction~addCallback
 * @param {*} key The key of the item being added
 * @returns {ImmutableModel}
 */

/**
 * Add an item to the collection
 * @param {*} [key] A unique identifier of the item
 * @param {ImmutableModel|EnumerableTransaction~addCallback} addCallback A function to resolve an item or the item to be added
 * @returns {EnumerableTransaction}
 */
EnumerableTransaction.prototype.add = function(key, addCallback) {
    var wrappedKey = !TransactionUtils.isNullOrUndefined(addCallback) && !TransactionUtils.isNullOrUndefined(key) ? key : null;
    var wrappedAddCallback = TransactionUtils.wrapValueCallback(addCallback, [addCallback, key]);

    this._modifications.push(this._addCallback.bind(this._thisArg, this, wrappedKey, wrappedAddCallback));

    return this;
};

/**
 * Called when an item is already exists in the collection and requires updating
 * @callback EnumerableTransaction~updateCallback
 * @param {*} key The key of the item being modified
 * @param {ImmutableModel} model The existing model being updated
 * @returns {ImmutableModel}
 */

/**
 *
 * @param {*} key A unique identifier of the item
 * @param {ImmutableModel|EnumerableTransaction~addCallback} addCallback A function to resolve an item or the item to be added
 * @param {ImmutableModel|EnumerableTransaction~updateCallback} [updateCallback] A function to resolve an item for updating or the item to be added
 * @returns {EnumerableTransaction}
 */
EnumerableTransaction.prototype.addOrUpdate = function(key, addCallback, updateCallback) {
    if (TransactionUtils.isNullOrUndefined(key)) throw new Error('Missing parameter "key"');
    var wrappedAddCallback = TransactionUtils.wrapValueCallback(addCallback, [addCallback]);
    var wrappedUpdateCallback = TransactionUtils.wrapValueCallback(updateCallback, [updateCallback, addCallback]);

    this._modifications.push(this._addOrUpdateCallback.bind(this._thisArg, this, key, wrappedAddCallback, wrappedUpdateCallback));

    return this;
};

/**
 *
 * @param {*} key A unique identifier of the item
 * @param {ImmutableModel|EnumerableTransaction~updateCallback} updateCallback A function to resolve an item for updating or the item to be updated with
 * @returns {EnumerableTransaction}
 */
EnumerableTransaction.prototype.update = function(key, updateCallback) {
    if (TransactionUtils.isNullOrUndefined(key)) throw new Error('Missing parameter "key"');
    var wrappedUpdateCallback = TransactionUtils.wrapValueCallback(updateCallback, [updateCallback]);

    this._modifications.push(this._updateCallback.bind(this._thisArg, this, key, wrappedUpdateCallback));

    return this;
};

/**
 * Predicate to work out if an item should be removed or not
 * @callback EnumerableTransaction~whereCallback
 * @param {*} key The key of the item being checked
 * @param {ImmutableModel} model The model to check
 * @returns {Boolean} True to remove the item, false to keep the item.
 */

/**
 * Remove all items that match a supplied predicate
 * @param {EnumerableTransaction~whereCallback} whereCallback
 * @returns {EnumerableTransaction}
 */
EnumerableTransaction.prototype.removeWhere = function(whereCallback) {
    this._modifications.push(this._removeWhereCallback.bind(this._thisArg, this, whereCallback));

    return this;
};

/**
 * Remove a specific key if it exists from the collection
 * @param key
 * @returns {EnumerableTransaction}
 */
EnumerableTransaction.prototype.remove = function(key) {
    if (TransactionUtils.isNullOrUndefined(key)) throw new Error('Missing parameter "key"');
    this._modifications.push(this._removeCallback.bind(this._thisArg, this, key));

    return this;
};

/**
 * Remove all items from the collection
 * @returns {EnumerableTransaction}
 */
EnumerableTransaction.prototype.clear = function() {
    this._modifications.push(this._clearCallback.bind(this._thisArg, this));

    return this;
};

/**
 * Commit the changes of the transaction,
 * @returns A new collection with all the changes applied, or the original collection if no changes were required.
 */
EnumerableTransaction.prototype.commit = function() {
    // Note that this._modifications.length can grow while enumerating.
    for (var offset = 0; offset < this._modifications.length; offset++) {
        this._modifications[offset]();
    }

    return this._commitCallback.call(this._thisArg, this);
};

module.exports = {
    create: function(data) {
        if (!data) throw new Error('Missing parameter "data"');
        return new EnumerableTransaction(data);
    }
};