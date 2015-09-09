var ImmutableModelFactory = require('./src/ImmutableModelFactory');

var index = { };

/**
 * Freezer singleton used throughout Phauxy to freeze and check if objects are frozen. Can be disabled for
 * performance in production. It's enabled by default (cause you're using an immutable library..)
 */
index.Freezer = index.freezer = require('./src/ImmutableFreezer');

/**
 * Optimizer singleton used to optimize models for speed in equals over memory usage.
 */
index.Optimizer = index.optimizer = require('./src/ImmutableOptimizer');

/**
 * Create an instance of an immutable dictionary from an object.
 */
index.Dictionary = index.dictionary = require('./src/ImmutableDictionaryFactory').create;

/**
 * Create an instance of an immutable list from an array of items
 */
index.List = index.list = require('./src/ImmutableListFactory').create;

/**
 * Create an instance of generic model from supplied data
 */
index.Model = index.model = require('./src/ImmutableGenericModelFactory').create;

/**
 * Create a model constructor, providing a named constructor for your model. e.g: function UserModel(...) {. If you
 * don't provide a name then you won't benefit from the warnings thrown.
 *
 * When you instantiate and complete setting up your model be sure to call assertUnfrozen() to get warnings
 * about any items not frozen in your model during development. This function will do nothing in production.
 */
index.Model.Extend = index.Model.extend = index.model.extend = index.model.Extend = ImmutableModelFactory.extend;

/**
 * Checks if two immutable models are equal.
 * The equality will result in true if:
 * a & b are the same object
 * a & b are not null, both ImmutableModels and are equal to each other
 * a & b are both falsey values (null, undefined, false, 0 etc)
 * @param a
 * @param b
 */
index.equals = ImmutableModelFactory.equals;
/**
 * Tests if the provided parameter is an instance of ImmutableModel
 * @param other The item to test as an ImmutableModel
 * @return {Boolean} True if the item is an immutable model, false otherwise.
 */
index.is = ImmutableModelFactory.instanceOf;

module.exports = index;