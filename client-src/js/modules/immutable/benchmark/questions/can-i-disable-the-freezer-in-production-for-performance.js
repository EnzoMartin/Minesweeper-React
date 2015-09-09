var SuiteFactory = require('../SuiteFactory');
var ImmutableFreezer = require('../../src/ImmutableFreezer');
var ImmutableListFactory = require('../../src/ImmutableListFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

var testFunction = function() {
    var items = [];

    ImmutableListFactory.create([
        new SimpleFrozenTextImmutableModel('one'),
        new SimpleFrozenTextImmutableModel('two'),
        new SimpleFrozenTextImmutableModel('three')
    ]).forEach(function(item) {
        items.push(item);
    });
};

SuiteFactory.question(
    'Can I disable the freezer in production for performance?',
    'Phauxy.Freezer.enable() (default) vs Phauxy.Freezer.disable()',
    'This only answered if you can, not if you should.'
    )
    .add('Yep', {
        onStart: function() {
            ImmutableFreezer.disable();
        },
        fn: testFunction,
        onComplete: function() {
            ImmutableFreezer.enable();
        }
    })
    .add('Nope', testFunction)

    .run();