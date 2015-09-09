var SuiteFactory = require('../SuiteFactory');
var ImmutableListFactory = require('../../src/ImmutableListFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

var enumerableFrozen = ImmutableListFactory.create([
    new SimpleFrozenTextImmutableModel('one'),
    new SimpleFrozenTextImmutableModel('two'),
    new SimpleFrozenTextImmutableModel('three')
]);

SuiteFactory.create('Looping over values of frozen vs slicing first')
    .add('frozen values forEach', function() {
        var items = [];

        enumerableFrozen.values.forEach(function(item) {
            items.push(item);
        });
    })
    .add('frozen values for (...)', function() {
        var items = [];

        for (var offset = 0; offset < enumerableFrozen.values.length; offset++) {
            items.push(enumerableFrozen.values[offset]);
        }
    })

    .add('unfrozen cloned values forEach', function() {
        var items = [];

        enumerableFrozen.values.slice().forEach(function(item) {
            items.push(item);
        });
    })
    .add('unfrozen cloned values for (...)', function() {
        var items = [];
        var cloned = enumerableFrozen.values.slice();

        for (var offset = 0; offset < cloned.length; offset++) {
            items.push(cloned[offset]);
        }
    })

    .run();