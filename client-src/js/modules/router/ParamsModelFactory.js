var Immutable = require('../immutable');

var ParamsModel = Immutable.Model.Extend(function ParamsModel(data) {
    Object.keys(data).forEach(function(key) {
        this[key] = data[key];
    }, this);

    Object.freeze(this);
});

/**
 * Checks if a state is equal, or the values are equal to another state.
 * @param other
 */
ParamsModel.prototype.equals = function(other) {
    return this === other || (
            Object.keys(this).length == Object.keys(other).length &&
            Object.keys(this).every(function(key) {
                return this[key] === other[key];
            }, this)
        );
};


module.exports = {
    create: function(data) {
        return new ParamsModel(data).assertUnfrozen();
    }
};