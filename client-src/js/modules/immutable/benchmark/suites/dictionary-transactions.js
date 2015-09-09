var SuiteFactory = require('../SuiteFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');
var ImmutableDictionaryFactory = require('../../src/ImmutableDictionaryFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

var one = new SimpleFrozenTextImmutableModel('one');
var two = new SimpleFrozenTextImmutableModel('two');
var three = new SimpleFrozenTextImmutableModel('three');

var dictionary = ImmutableDictionaryFactory.create();

SuiteFactory.create('Noops on a dictionary in transaction')
    .add('creating a transaction with no commit', function() {
        dictionary.transaction();
    })
    .add('adding no items to a dictionary in transaction', function() {
        dictionary.transaction().commit();
    })
    .run();

SuiteFactory.create('Transactions report on dictionary')
    .add('adding a single item to a dictionary in transaction', function() {
        dictionary.transaction().add('one', one).commit();
    })
    .add('adding a two items to a dictionary in transaction', function() {
        dictionary.transaction().add('one', one).add('two', two).commit();
    })
    .add('adding a three items to a dictionary in transaction', function() {
        dictionary.transaction().add('one', one).add('two', two).add('three', three).commit();
    })
    .add('adding the same item twice to the dictionary', function() {
        dictionary.transaction().add('one', one).add('one', one).commit();
    })
    .run();
