function isNullOrUndefined(value) {
    return typeof value === "undefined" || value == null;
}

/**
 * Return the first argument that is not null or undefined
 * @returns {*}
 */
function coalesce(values) {
    var item = null;

    for (var offset = 0; offset < values.length && !item; offset++) {
        if (!isNullOrUndefined(values[offset])) {
            item = values[offset];
        }
    }

    return item;
}

/**
 * Wrap an object in a function that returns the value. This helps present a consistent output of Transaction for user
 * in immutable collections. If the item is already a function then no wrapping occurs.
 * @param item
 * @param values
 */
function wrapValueCallback(item, values) {
    var callback = item;

    if (!(callback instanceof Function)) {
        var value = coalesce(values);

        if (!(value instanceof Function)) {
            callback = function() {
                return value;
            };
        } else {
            callback = value;
        }
    }

    return callback;
}

module.exports = {
    isNullOrUndefined: isNullOrUndefined,
    wrapValueCallback: wrapValueCallback
};