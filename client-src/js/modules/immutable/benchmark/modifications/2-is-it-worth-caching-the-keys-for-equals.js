var SuiteFactory = require('../SuiteFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModelWithOptimization = ImmutableModelFactory.extend(function SimpleFrozenTextImmutableModelWithOptimization(text) {
    this.text = text;

    Object.defineProperty(this, '__immutable_optimizer_keys', {
        value: Object.keys(this)
    });

    Object.freeze(this);
});

var SimpleFrozenTextImmutableModelWithoutOptimization = ImmutableModelFactory.extend(function SimpleFrozenTextImmutableModelWithoutOptimization(text) {
    this.text = text;
    Object.freeze(this);
});

var original = function(context, other) {
    var equals = false;

    if (this !== other) {
        if (other && other instanceof Object) {
            var thisKeys = Object.keys(context);
            var otherKeys = Object.keys(other);

            // If we don't have the same number of keys then we can't be equal
            if (thisKeys.length === otherKeys.length) {
                var equality = true;

                for (var offset = 0; offset < thisKeys.length && equality; offset++) {
                    if (other.hasOwnProperty(thisKeys[offset])) {
                        var thisValue = this[thisKeys[offset]];
                        var otherValue = other[thisKeys[offset]];

                        if (ImmutableModelFactory.instanceOf(thisValue)) {
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

var proposed = function(context, other) {
    var equals = false;

    if (this !== other) {
        if (other && other instanceof Object) {
            var thisKeys = context.__immutable_optimizer_keys  ? context.__immutable_optimizer_keys : Object.keys(context);
            var otherKeys = other.__immutable_optimizer_keys ? other.__immutable_optimizer_keys : Object.keys(other);

            // If we don't have the same number of keys then we can't be equal
            if (thisKeys.length === otherKeys.length) {
                var equality = true;

                for (var offset = 0; offset < thisKeys.length && equality; offset++) {
                    if (other.hasOwnProperty(thisKeys[offset])) {
                        var thisValue = this[thisKeys[offset]];
                        var otherValue = other[thisKeys[offset]];

                        if (ImmutableModelFactory.instanceOf(thisValue)) {
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

var oneWith = new SimpleFrozenTextImmutableModelWithOptimization('one');
var twoWith = new SimpleFrozenTextImmutableModelWithOptimization('two');

var oneWithout = new SimpleFrozenTextImmutableModelWithoutOptimization('one');
var twoWithout = new SimpleFrozenTextImmutableModelWithoutOptimization('two');

SuiteFactory.question(
    '2 is it worth caching the keys for equals?'
)
    .add('Yep', function() {
        proposed(oneWith, twoWith);
    })
    .add('Nope', function() {
        original(oneWith, twoWith);
    })

    .run();


SuiteFactory.question(
    '2 does the optimization have a negative impact on non-optimized objects?'
)
    .add('Yep', function() {
        original(oneWithout, twoWithout);
    })
    .add('Nope', function() {
        proposed(oneWithout, twoWithout);
    })

    .run();