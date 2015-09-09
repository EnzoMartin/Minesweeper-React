var SuiteFactory = require('../SuiteFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

var original = function(context, other) {
    var equals = false;

    if (this !== other) {
        if (other && other instanceof Object) {
            var thisKeys = Object.keys(context).sort();
            var otherKeys = Object.keys(other).sort();

            // If we don't have the same number of keys then we can't be equal
            if (thisKeys.length === otherKeys.length) {
                var equality = true;

                for (var offset = 0; offset < thisKeys.length && equality; offset++) {
                    if (thisKeys[offset] === otherKeys[offset]) {
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

var one = new SimpleFrozenTextImmutableModel('one');
var two = new SimpleFrozenTextImmutableModel('two');

SuiteFactory.question(
    '1 is it worth removing sort from equals?'
)
    .add('Yep', function() {
        proposed(one, two);
    })
    .add('Nope', function() {
        original(one, two);
    })

    .run();
