var SuiteFactory = require('../SuiteFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

var enumerableFrozen = [
    new SimpleFrozenTextImmutableModel('one'),
    new SimpleFrozenTextImmutableModel('two'),
    new SimpleFrozenTextImmutableModel('three')
];

var enumerableUnfrozen = [
    new SimpleFrozenTextImmutableModel('one'),
    new SimpleFrozenTextImmutableModel('two'),
    new SimpleFrozenTextImmutableModel('three')
];

Object.freeze(enumerableFrozen);

SuiteFactory.create('Looping over items of a frozen vs unfrozen array')
    .add('frozen .forEach', function() {
        var items = [];

        enumerableFrozen.forEach(function(item) {
            items.push(item);
        });
    })
    .add('frozen for (...)', function() {
        var items = [];

        for (var offset = 0; offset < enumerableFrozen.length; offset++) {
            items.push(enumerableFrozen[offset]);
        }
    })

    .add('unfrozen .forEach', function() {
        var items = [];

        enumerableUnfrozen.forEach(function(item) {
            items.push(item);
        });
    })
    .add('unfrozen for (...)', function() {
        var items = [];

        for (var offset = 0; offset < enumerableUnfrozen.length; offset++) {
            items.push(enumerableUnfrozen[offset]);
        }
    })

    .run();