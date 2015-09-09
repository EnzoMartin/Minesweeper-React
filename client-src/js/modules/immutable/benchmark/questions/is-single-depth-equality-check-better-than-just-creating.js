var SuiteFactory = require('../SuiteFactory');
var ImmutableFreezer = require('../../src/ImmutableFreezer');
var ImmutableListFactory = require('../../src/ImmutableListFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

var existingIdentical = new SimpleFrozenTextImmutableModel('hello');
var updatedIdentical = new SimpleFrozenTextImmutableModel('hello');

SuiteFactory.question(
    'Is single depth equality check better than just creating for identical objects?',
    '!ImmutableModel.equals(other) ? new ImmutableModel(other) vs new ImmutableModel(other) '
    )
    .add('Yep', function() {
        if (!existingIdentical.equals(updatedIdentical)) {
            // Should not reach!
            new SimpleFrozenTextImmutableModel('hello');

            throw new Error();
        }
    })
    .add('Nope', function() {
        new SimpleFrozenTextImmutableModel('hello');
    })

    .run();

var existingDifferent = new SimpleFrozenTextImmutableModel('hello1');
var updatedDifferent = new SimpleFrozenTextImmutableModel('hello2');

SuiteFactory.question(
    'Is single depth equality check better than just creating for different objects?',
    '!ImmutableModel.equals(other) ? new ImmutableModel(other) vs new ImmutableModel(other) '
)
    .add('Yep', function() {
        if (!existingDifferent.equals(updatedDifferent)) {
            new SimpleFrozenTextImmutableModel('hello');
        }
    })
    .add('Nope', function() {
        new SimpleFrozenTextImmutableModel('hello');
    })

    .run();


var existingRandom = new SimpleFrozenTextImmutableModel('hello1');
var updatedRandom = new SimpleFrozenTextImmutableModel('hello2');

SuiteFactory.question(
    'Is single depth equality check better than just creating for randomly identical/different objects?',
    '!ImmutableModel.equals(other) ? new ImmutableModel(other) vs new ImmutableModel(other) randomly choosing '
)
    .add('Yep', function() {
        if (!existingRandom.equals(Math.random() > 0.5 ? updatedRandom : existingRandom)) {
            new SimpleFrozenTextImmutableModel('hello');
        }
    })
    .add('Nope', function() {
        new SimpleFrozenTextImmutableModel('hello');
    })

    .run();