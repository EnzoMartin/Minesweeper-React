function ImmutableFreezer() {
    this.isEnabled = true;
    this.disabledIsFrozenResponse = true;
}

/**
 * Passes an object onto Object.freeze if the freezer is enabled
 * @param obj The object to freeze
 * @returns {Object} The result of Object.freeze (the frozen object) or the object with no processing
 */
ImmutableFreezer.prototype.freeze = function(obj) {
    return this.isEnabled ? Object.freeze(obj) : obj;
};

/**
 * Freezes an object and all properties of the object that require freezing (Objects, Arrays)
 * @param obj The object to put into deep freeze
 * @returns {Object} The result of Object.freeze (the frozen object) or the object with no processing
 */
ImmutableFreezer.prototype.deepFreeze = function(obj) {
    if (this.isEnabled) {
        Object.keys(obj).forEach(function(key) {
            if (obj[key]) {
                if (obj[key] instanceof Object) {
                    ImmutableFreezer.prototype.deepFreeze.call(this, obj[key]);
                } else if (obj[key] instanceof Array) {
                    obj[key].forEach(function(item) {
                        ImmutableFreezer.prototype.deepFreeze.call(this, item);
                    });

                    ImmutableFreezer.prototype.freeze.call(this, obj);
                }
            }
        }, this);
    }

    return ImmutableFreezer.prototype.freeze.call(this, obj);
};

/**
 * Checks if an object is frozen. If the freezer is disabled this method will always return true.
 * @param obj
 * @returns {boolean}
 */
ImmutableFreezer.prototype.isFrozen = function(obj) {
    return this.isEnabled ? Object.isFrozen(obj) : this.disabledIsFrozenResponse;
};

/**
 * Turns the freezer on. All objects passed in will be frozen or properly checked for a frozen status
 */
ImmutableFreezer.prototype.enable = function() {
    if (!this.isEnabled && "production" != "development") {
        console.warn('ImmutableFreezer: Enabling immutable freezer, all objects processed beyond this point will be immutable.');
    }

    this.isEnabled = true;
};

/**
 * Turn the freezer off. Any objects that come in won't be frozen and a frozen check will return the value of
 * disabledIsFrozenResponse (true by default)
 */
ImmutableFreezer.prototype.disable = function() {
    if (this.isEnabled && "production" != "development") {
        console.warn('ImmutableFreezer: Disabling immutable freezer, all objects processed beyond this point will not be immutable.');
    }

    this.isEnabled = false;
};

module.exports = new ImmutableFreezer();