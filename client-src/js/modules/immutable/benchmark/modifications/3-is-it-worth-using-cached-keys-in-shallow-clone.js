var SuiteFactory = require('../SuiteFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModelWithOptimization = ImmutableModelFactory.extend(function SimpleFrozenTextImmutableModelWithOptimization(text) {
    this.text = text;

    Object.defineProperty(this, '__immutable_optimizer_keys', {
        value: Object.keys(this)
    });

    Object.freeze(this);
});

var original = function(context) {
    var cloned = {};

    Object.keys(context).forEach(function(key) {
        cloned[key] = context[key];
    }, context);

    return cloned;
};

var proposed = function(context) {
    var cloned = {};
    var keys = context.__immutable_optimizer_keys  ? context.__immutable_optimizer_keys : Object.keys(context);

    for (var offset = 0; offset < keys.length; offset++) {
        cloned[keys[offset]] = context[keys[offset]];
    }

    return cloned;
};

var model = new SimpleFrozenTextImmutableModelWithOptimization('one');

SuiteFactory.question(
    '3 is it worth using cached keys in shallow clone?'
)
    .add('Yep', function() {
        proposed(model);
    })
    .add('Nope', function() {
        original(model);
    })

    .run();
