var SuiteFactory = require('../SuiteFactory');
var ImmutableListFactory = require('../../src/ImmutableListFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

SuiteFactory.question(
    'Should I use immutable if performance is critical?',
    'ImmutableModelFactory.values.forEach(...) vs [].forEach()',
    "You shouldn't base your applications requirements on any of these tests. "
    )
    .add('Yep', function() {
        var items = [];

        ImmutableListFactory.create([
            new SimpleFrozenTextImmutableModel('one'),
            new SimpleFrozenTextImmutableModel('two'),
            new SimpleFrozenTextImmutableModel('three')
        ]).forEach(function(item) {
            items.push(item);
        });
    })

    .add('Nope', function() {
        var items = [];

        var enumerableUnfrozen = [
            {
                text: 'one'
            },
            {
                text: 'two'
            },
            {
                text: 'three'
            }
        ].forEach(function(item) {
            items.push(item);
        });
    })

    .run();