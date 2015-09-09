var assert = require("assert");
var ImmutableModelFactory = require('../src/ImmutableModelFactory');
var ImmutableDictionaryFactory = require('../src/ImmutableDictionaryFactory');

var SimpleTextModel = ImmutableModelFactory.extend(function Model(text) {
    this.text = text;

    Object.freeze(this);
});

describe('ImmutableDictionaryFactory', function() {
    describe('#create()', function() {
        it('should freeze the dictionary', function() {
            assert.equal(Object.isFrozen(ImmutableDictionaryFactory.create()), true);
        });
        it('should freeze the exposed values dictionary', function() {
            assert.equal(Object.isFrozen(ImmutableDictionaryFactory.create().values), true);
        });
        it('should set the dictionary with passed in data', function() {
            var one = ImmutableDictionaryFactory.create({
                '1': new SimpleTextModel('hello1'),
                '2': new SimpleTextModel('hello2'),
                '3': new SimpleTextModel('hello3')
            });

            assert.equal(one.values.length, 3);
        });
        it('should set the length to the length of the values dictionary', function() {
            var one = ImmutableDictionaryFactory.create({
                '1': new SimpleTextModel('hello1'),
                '2': new SimpleTextModel('hello2'),
                '3': new SimpleTextModel('hello3')
            });

            assert.equal(one.length === 3, true);
        });
        it('should convert simple objects to generic models', function() {
            var dictionary = ImmutableDictionaryFactory.create({
                '1': {
                    text: 'hello1'
                }
            });

            assert.equal(ImmutableModelFactory.instanceOf(dictionary.values[0]), true);
        });
    });
    describe('ImmutableDictionary', function() {
        describe('#equals()', function() {
            it('should have two empty dictionaries equal each other', function() {
                assert.equal(ImmutableDictionaryFactory.create().equals(ImmutableDictionaryFactory.create()), true);
            });
            it('should have two empty dictionaries equal each other, the other being a js object', function() {
                assert.equal(ImmutableDictionaryFactory.create().equals({}), true);
            });
            it('should have two dictionaries with the same item equal each other', function() {
                var items = {
                    '1': new SimpleTextModel('hello1')
                };

                assert.equal(ImmutableDictionaryFactory.create(items).equals(ImmutableDictionaryFactory.create(items)), true);
            });
            it('should have two dictionaries with the same items equal each other, even if declared in different order', function() {
                var itemsOne = {
                    'one': new SimpleTextModel('hello1'),
                    'two': new SimpleTextModel('hello2')
                };

                var itemsTwo = {
                    'two': new SimpleTextModel('hello2'),
                    'one': new SimpleTextModel('hello1')
                };

                assert.equal(ImmutableDictionaryFactory.create(itemsOne).equals(ImmutableDictionaryFactory.create(itemsTwo)), true);
            });
            it('should have two dictionaries with the same items equal each other, even if declared in different order and the other js object', function() {
                var itemsOne = {
                    'one': new SimpleTextModel('hello1'),
                    'two': new SimpleTextModel('hello2')
                };

                var itemsTwo = {
                    'two': new SimpleTextModel('hello2'),
                    'one': new SimpleTextModel('hello1')
                };

                assert.equal(ImmutableDictionaryFactory.create(itemsOne).equals(itemsTwo), true);
            });
            it('should have two dictionaries with the same item but different keys not equal to each other', function() {
                var itemsOne = {
                    '1': new SimpleTextModel('hello1')
                };

                var itemsTwo = {
                    '2': new SimpleTextModel('hello1')
                };

                assert.equal(ImmutableDictionaryFactory.create(itemsOne).equals(ImmutableDictionaryFactory.create(itemsTwo)), false);
            });
            it('should have two dictionaries with different lengths not equal each other', function() {
                var itemsOne = {
                    '1': new SimpleTextModel('hello1')
                };

                var itemsTwo = {
                    '2': new SimpleTextModel('hello2'),
                    '3': new SimpleTextModel('hello3')
                };

                assert.equal(ImmutableDictionaryFactory.create(itemsOne).equals(ImmutableDictionaryFactory.create(itemsTwo)), false);
            });
            it('should have two dictionaries with identical lengths but different items not equal each other', function() {
                var itemsOne = {
                    '1': new SimpleTextModel('hello1')
                };

                var itemsTwo = {
                    '1': new SimpleTextModel('hello2')
                };

                assert.equal(ImmutableDictionaryFactory.create(itemsOne).equals(ImmutableDictionaryFactory.create(itemsTwo)), false);
            });
            it('should not equal if a parameter is not provided', function() {
                assert.equal(ImmutableDictionaryFactory.create().equals(), false);
            });
            it('should not equal if a non-object parameter is provided', function() {
                assert.equal(ImmutableDictionaryFactory.create().equals(18), false);
            });
        });
        describe('#forEach()', function() {
            it('should enumerate the values', function() {
                var one = ImmutableDictionaryFactory.create({
                    '1': new SimpleTextModel('hello1'),
                    '2': new SimpleTextModel('hello2'),
                    '3': new SimpleTextModel('hello3')
                });

                var count = 0;

                one.forEach(function() {
                    count++;
                });

                assert.equal(count, 3);
            });
        });
        describe('#find()', function() {
            it('should find the first item matching the predicate', function() {
                var dictionary = ImmutableDictionaryFactory.create({
                    '1': new SimpleTextModel('hello1'),
                    '2': new SimpleTextModel('hello2'),
                    '3': new SimpleTextModel('hello3')
                });

                var item = dictionary.find(function(item, key, values) {
                    return item.text === 'hello2';
                });

                assert.equal(item.text, 'hello2');
            });
            it('should return falsey value when it cant find an item', function() {
                var dictionary = ImmutableDictionaryFactory.create({
                    '1': new SimpleTextModel('hello1'),
                    '2': new SimpleTextModel('hello2'),
                    '3': new SimpleTextModel('hello3')
                });

                var item = dictionary.find(function(item, key, values) {
                    return item.text === 'hello4';
                });

                assert.equal(!!item, false);
            });
            it('should return falsey when the dictionary is empty', function() {
                var dictionary = ImmutableDictionaryFactory.create();

                var item = dictionary.find(function(item, key, values) {
                    return item.text === 'hello4';
                });

                assert.equal(!!item, false);
            });
        });
        describe('#transaction()', function() {
            describe('#set()', function() {
                it('should push an item onto a new dictionary', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction().set({
                        '1': new SimpleTextModel('hello1')
                    }).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
                it('should remove an item from the new dictionary', function() {
                    var one = ImmutableDictionaryFactory.create({
                        '1': new SimpleTextModel('hello1'),
                        '2': new SimpleTextModel('hello2')
                    });
                    var two = one.transaction().set({
                        '1': new SimpleTextModel('hello1')
                    }).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
            });
            describe('#add()', function() {
                it('should push an item onto a new dictionary', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction().add('1', new SimpleTextModel('hello1')).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
                it('should set an item onto a new dictionary from a callback', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction().add('1', function() {
                        return new SimpleTextModel('hello1');
                    }).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
                it('should set two items on a new dictionary', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction().add('1', new SimpleTextModel('hello1')).add('2', new SimpleTextModel('hello2')).commit();

                    assert.equal(one !== two && two.length === 2, true);
                });
                it('should set two items onto a new dictionary from callbacks', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction().add('1', function() { return new SimpleTextModel('hello1'); }).add('2', function() { return new SimpleTextModel('hello2'); }).commit();

                    assert.equal(one !== two && two.length === 2, true);
                });
                it('should not change the dictionary if no key is supplied', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction().add(new SimpleTextModel('hello1')).commit();

                    assert.equal(one === two, true);
                });
            });
            describe('#addOrUpdate()', function() {
                it('should push an item onto a new dictionary', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction().addOrUpdate('1', new SimpleTextModel('hello1')).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
                it('should update the item if provided with an existing index', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction()
                        .addOrUpdate('1', new SimpleTextModel('hello1'))
                        .addOrUpdate('1', function() { throw new Error('Should not add!') }, new SimpleTextModel('hello2'))
                        .commit();

                    assert.equal(one !== two && two.length === 1 && two.index('1').text === 'hello2', true);
                });
                it('should update the item if provided with an existing index with a callback', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction()
                        .addOrUpdate('1', new SimpleTextModel('hello1'))
                        .addOrUpdate('1', function() { throw new Error('Should not add!') }, function() {
                            return new SimpleTextModel('hello2');
                        })
                        .commit();

                    assert.equal(one !== two && two.length === 1 && two.index('1').text === 'hello2', true);
                });
                it('should work like add if no index is supplied from a callback', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction().addOrUpdate('1', function() {
                        return new SimpleTextModel('hello1');
                    }).commit();

                    assert.equal(one !== two && two.length === 1 && two.index('1').text === 'hello1', true);
                });
            });
            describe('#update()', function() {
                it('should update an item onto a new dictionary', function() {
                    var one = ImmutableDictionaryFactory.create({
                        '1': new SimpleTextModel('hello1')
                    });
                    var two = one.transaction().update('1', new SimpleTextModel('hello2')).commit();

                    assert.equal(one !== two && two.length === 1 && two.index('1').text === 'hello2', true);
                });
                it('should update the item if provided with an existing index', function() {
                    var one = ImmutableDictionaryFactory.create({
                        '1': new SimpleTextModel('hello1')
                    });
                    var two = one.transaction().update('1', new SimpleTextModel('hello2')).commit();

                    assert.equal(one !== two && two.length === 1 && two.index('1').text === 'hello2', true);
                });
                it('should update the item if provided with an existing index from callback', function() {
                    var one = ImmutableDictionaryFactory.create({
                        '1': new SimpleTextModel('hello1')
                    });
                    var two = one.transaction().update('1', function() {
                        return new SimpleTextModel('hello2');
                    }).commit();

                    assert.equal(one !== two && two.length === 1 && two.index('1').text === 'hello2', true);
                });
            });
            describe('#removeWhere()', function() {
                it('should remove an item onto a new dictionary', function() {
                    var one = ImmutableDictionaryFactory.create({
                        '1': new SimpleTextModel('hello1')
                    });
                    var two = one.transaction().removeWhere(function() { return true; } ).commit();

                    assert.equal(one !== two && two.length === 0, true);
                });
                it('should keep the same dictionary if no changes were made', function() {
                    var one = ImmutableDictionaryFactory.create({
                        '1': new SimpleTextModel('hello1')
                    });
                    var two = one.transaction().removeWhere(function() { return false; } ).commit();

                    assert.equal(one === two, true);
                });
            });
            describe('#remove()', function() {
                it('should remove an item onto a new dictionary', function() {
                    var one = ImmutableDictionaryFactory.create({
                        '1': new SimpleTextModel('hello1')
                    });
                    var two = one.transaction().remove('1').commit();

                    assert.equal(one !== two && two.length === 0, true);
                });
                it('should keep the same dictionary if no changes were made', function() {
                    var one = ImmutableDictionaryFactory.create({
                        '1': new SimpleTextModel('hello1')
                    });
                    var two = one.transaction().remove('2').commit();

                    assert.equal(one === two, true);
                });
            });
            describe('#clear()', function() {
                it('should clear the dictionary and create a new immutable model', function() {
                    var one = ImmutableDictionaryFactory.create({
                        '1': new SimpleTextModel('hello1')
                    });
                    var two = one.transaction().clear().commit();

                    assert.equal(one !== two && two.length === 0, true);
                });
                it('should maintain the same dictionary if the original contains no items', function() {
                    var one = ImmutableDictionaryFactory.create();
                    var two = one.transaction().clear().commit();

                    assert.equal(one === two, true);
                });
            });
        });
    });
});