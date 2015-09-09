var SuiteFactory = require('../SuiteFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

var SimpleUnfrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
});

var SimpleTextModel = function(text) {
    this.text = text;
};

SuiteFactory.create('Instantiating immutable frozen vs immutable unfrozen vs simple model')
    .add('SimpleFrozenTextImmutableModel', function() {
        new SimpleFrozenTextImmutableModel('hello');
    })
    .add('SimpleUnfrozenTextImmutableModel', function() {
        new SimpleUnfrozenTextImmutableModel('hello');
    })
    .add('SimpleTextModel', function() {
        new SimpleTextModel('hello');
    })
    .run();