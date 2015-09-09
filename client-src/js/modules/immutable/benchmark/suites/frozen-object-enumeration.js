var SuiteFactory = require('../SuiteFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

var enumerableFrozen = {
    'one': new SimpleFrozenTextImmutableModel('one'),
    'two': new SimpleFrozenTextImmutableModel('two'),
    'three': new SimpleFrozenTextImmutableModel('three')
};

var enumerableUnfrozen = {
    'one': new SimpleFrozenTextImmutableModel('one'),
    'two': new SimpleFrozenTextImmutableModel('two'),
    'three': new SimpleFrozenTextImmutableModel('three')
};

var enumerableFrozenKeys = Object.keys(enumerableFrozen);
var enumerableUnfrozenKeys = Object.keys(enumerableUnfrozen);

Object.freeze(enumerableFrozen);
Object.freeze(enumerableFrozenKeys);

SuiteFactory.create('Looping over the keys of a frozen vs unfrozen object')
    .add('frozen for (... in ...)', function() {
        var keys = [];

        for (var key in enumerableFrozen) {
            if (enumerableFrozen.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
    })
    .add('frozen Object.keys(...).forEach', function() {
        var keys = [];

        Object.keys(enumerableFrozen).forEach(function(key) {
            keys.push(key);
        });
    })
    .add('frozen Object.keys(...).forEach with cached keys', function() {
        var keys = [];

        enumerableFrozenKeys.forEach(function(key) {
            keys.push(key);
        });
    })
    .add('frozen for (...) with cached keys', function() {
        var keys = [];

        for (var offset = 0; offset < enumerableFrozenKeys.length; offset++) {
            keys.push(enumerableFrozenKeys[offset]);
        }
    })

    .add('unfrozen for (... in ...)', function() {
        var keys = [];

        for (var key in enumerableUnfrozen) {
            if (enumerableUnfrozen.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
    })
    .add('unfrozen Object.keys(...).forEach', function() {
        var keys = [];

        Object.keys(enumerableUnfrozen).forEach(function(key) {
            keys.push(key);
        });
    })
    .add('unfrozen Object.keys(...).forEach with cached keys', function() {
        var keys = [];

        enumerableUnfrozenKeys.forEach(function(key) {
            keys.push(key);
        });
    })
    .add('unfrozen for (...) with cached keys', function() {
        var keys = [];

        for (var offset = 0; offset < enumerableUnfrozenKeys.length; offset++) {
            keys.push(enumerableUnfrozenKeys[offset]);
        }
    })

    .run();