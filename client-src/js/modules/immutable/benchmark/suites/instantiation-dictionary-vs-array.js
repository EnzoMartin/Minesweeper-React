var SuiteFactory = require('../SuiteFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');
var ImmutableDictionaryFactory = require('../../src/ImmutableDictionaryFactory');
var ImmutableListFactory = require('../../src/ImmutableListFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

SuiteFactory.create('Instantiating immutable dictionary vs array with no items')
    .add('ImmutableDictionaryFactory.create()', function() {
        ImmutableDictionaryFactory.create();
    })
    .add('ImmutableListFactory.create()', function() {
        ImmutableListFactory.create();
    })
    .run();

SuiteFactory.create('Instantiating immutable dictionary vs array with 3 items')
    .add('ImmutableDictionaryFactory.create({ ... x 3 } )', function() {
        ImmutableDictionaryFactory.create({
            'one': new SimpleFrozenTextImmutableModel('one'),
            'two': new SimpleFrozenTextImmutableModel('two'),
            'three': new SimpleFrozenTextImmutableModel('three')
        });
    })
    .add('ImmutableListFactory.create([ ... x 3 ])', function() {
        ImmutableListFactory.create([
            new SimpleFrozenTextImmutableModel('one'),
            new SimpleFrozenTextImmutableModel('two'),
            new SimpleFrozenTextImmutableModel('three')
        ]);
    })
    .run();