var ImmutableFreezer = require('./ImmutableFreezer');
var ImmutableOptimizer = require('./ImmutableOptimizer');
var TransactionFactory = require('./TransactionFactory');

function ImmutableModel() { }

ImmutableModel.prototype.equals = function(other) {
    var equals = false;

    if (this !== other) {
        if (other && other instanceof Object) {
            var thisKeys = this.__immutable_optimizer_keys  ? this.__immutable_optimizer_keys : Object.keys(this);
            var otherKeys = other.__immutable_optimizer_keys ? other.__immutable_optimizer_keys : Object.keys(other);

            // If we don't have the same number of keys then we can't be equal
            if (thisKeys.length === otherKeys.length) {
                var equality = true;

                for (var offset = 0; offset < thisKeys.length && equality; offset++) {
                    if (other.hasOwnProperty(thisKeys[offset])) {
                        var thisValue = this[thisKeys[offset]];
                        var otherValue = other[thisKeys[offset]];

                        if (thisValue instanceof ImmutableModel) {
                            equality = thisValue.equals(otherValue);
                        } else {
                            equality = thisValue === otherValue;
                        }
                    } else {
                        // Key mismatch, one object has different keys to the other, can't be equal.
                        equality = false;
                    }
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

ImmutableModel.prototype.shallowClone = function() {
    var cloned = {};
    var keys = this.__immutable_optimizer_keys  ? this.__immutable_optimizer_keys : Object.keys(this);

    for (var offset = 0; offset < keys.length; offset++) {
        cloned[keys[offset]] = this[keys[offset]];
    }

    return cloned;
};

/**
 * Optimize and freeze the model
 */
ImmutableModel.prototype.package = function() {
    ImmutableOptimizer.model(this);

    ImmutableFreezer.deepFreeze(this);
};

ImmutableModel.prototype.assertUnfrozen = function() {
    if ("production" != "development") {
        var error = function (variableType, typeName, variableName) {
            var fullTypeName = typeName;
            var fullVariableName = variableName;

            if (variableName && variableName != 'this') {
                fullTypeName += '.' + variableName;
                fullVariableName = 'this.' + variableName;
            }

            throw new Error('ImmutableModel: ' + variableType + ' ' + fullTypeName + ' isn\'t frozen, did you forget to call this.package() or Phauxy.Freezer.freeze(' + fullVariableName + ') in your ' + typeName + ' constructor?');
        };

        if (!ImmutableFreezer.isFrozen(this)) {
            error('Object', this.constructor.name, 'this');
        }

        Object.keys(this).forEach(function (key) {
            var value = this[key];

            if (value instanceof Array && !ImmutableFreezer.isFrozen(value)) {
                error('Array', this.constructor.name, key);
            } else if (value instanceof Object && !ImmutableFreezer.isFrozen(value) && !(value instanceof ImmutableModel)) {
                error('Object', this.constructor.name, key);
            }
        }, this);
    }

    return this;
};

/**
 * Start a transaction on the model. Call commit() to apply the changes and return a new model.
 * @returns {Transaction}
 */
ImmutableModel.prototype.transaction = function() {
    return TransactionFactory.create({
        thisArg: this,
        value: this.shallowClone(),
        set: function(transaction, properties, map) {
            properties.forEach(function(property) {
                var newValue = map[property](property, transaction._value[property]);

                if (transaction._value[property] instanceof ImmutableModel) {
                    newValue = transaction._value[property].transaction().set(newValue).commit();
                }

                if (transaction._value[property] !== newValue) {
                    transaction._value[property] = newValue;

                    transaction._modified = true;
                }
            });
        },
        commit: function(transaction, commitCallback) {
            var commit = this;

            if (transaction._modified) {
                if (commitCallback) {
                    commit = commitCallback(transaction._value);
                } else if (this.__proto__ && this.__proto__.constructor) {
                    commit = new this.__proto__.constructor(transaction._value);
                }

                // We should even throw an error here that the result isn't an immutable model.
                if (commit instanceof ImmutableModel) {
                    commit.assertUnfrozen();
                }
            }

            return commit;
        }
    });
};

module.exports = {
    extend: function(constructor) {
        if (!constructor) throw new Error('ImmutableModel: Missing parameter "constructor"');
        constructor.prototype = Object.create(ImmutableModel.prototype);
        constructor.prototype.constructor = constructor;

        return constructor;
    },
    instanceOf: function(obj) {
        return obj instanceof ImmutableModel;
    },
    /**
     * Checks if two immutable models are equal.
     * The equality will result in true if:
     * a & b are the same object
     * a & b are not null, both ImmutableModels and are equal to each other
     * a & b are both falsey values (null, undefined, false, 0 etc)
     * @param a
     * @param b
     */
    equals: function(a, b) {
        return a === b || (a && b && a instanceof ImmutableModel && b instanceof ImmutableModel && a.equals(b)) || (!a && !b);
    }
};