var ImmutableModelFactory = require('./ImmutableModelFactory');

/**
 * A generic model to fallback to if data is received in areas that are critical to have an ImmutableModel, such
 * as a dictionary getting a raw object can convert it to a generic object to use.
 */
var ImmutableGenericModel = ImmutableModelFactory.extend(function ImmutableGenericModel(data) {
    var keys = Object.keys(data);

    for (var offset = 0; offset < keys.length; offset++) {
        var value = data[keys[offset]];

        if (value instanceof Object && !ImmutableModelFactory.instanceOf(value)) {
            this[keys[offset]] = new ImmutableGenericModel(data[keys[offset]]);
        } else {
            this[keys[offset]] = data[keys[offset]];
        }
    }

    this.package();
});

module.exports = {
    create: function (data) {
        return new ImmutableGenericModel(data || {}).assertUnfrozen();
    }
};