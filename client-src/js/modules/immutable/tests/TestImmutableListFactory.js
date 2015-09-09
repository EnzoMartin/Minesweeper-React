var assert = require("assert");
var ImmutableModelFactory = require('../src/ImmutableModelFactory');
var ImmutableListFactory = require('../src/ImmutableListFactory');

var SimpleTextModel = ImmutableModelFactory.extend(function Model(text) {
    this.text = text;

    Object.freeze(this);
});

describe('ImmutableListFactory', function() {
    describe('#create()', function() {
        it('should freeze the array', function() {
            assert.equal(Object.isFrozen(ImmutableListFactory.create()), true);
        });
        it('should set the array with passed in data', function() {
            var array = ImmutableListFactory.create([
                new SimpleTextModel('hello1'),
                new SimpleTextModel('hello2'),
                new SimpleTextModel('hello3')
            ]);

            assert.equal(array.values.length, 3);
        });
        it('should set the length to the length of the values array', function() {
            var array = ImmutableListFactory.create([
                new SimpleTextModel('hello1'),
                new SimpleTextModel('hello2'),
                new SimpleTextModel('hello3')
            ]);

            assert.equal(array.length === 3, true);
        });
        it('should not assert unfrozen object', function(done) {
            var array = ImmutableListFactory.create();

            assert.doesNotThrow(function() {
                array.assertUnfrozen();
                done();
            });
        });
        it('should convert simple objects to generic models', function() {
            var array = ImmutableListFactory.create([
                {
                    text: 'hello1'
                }
            ]);

            assert.equal(ImmutableModelFactory.instanceOf(array.values[0]), true);
        });
    });
    describe('ImmutableList', function() {
        describe('#equals()', function() {
            it('should have two empty arrays equal each other', function() {
                assert.equal(ImmutableListFactory.create().equals(ImmutableListFactory.create()), true);
            });
            it('should have two empty arrays equal each other with the other as a js array', function() {
                assert.equal(ImmutableListFactory.create().equals([]), true);
            });
            it('should have two arrays with the same item equal each other', function() {
                var items = [
                    new SimpleTextModel('hello1')
                ];

                assert.equal(ImmutableListFactory.create(items).equals(ImmutableListFactory.create(items)), true);
            });
            it('should have two arrays with the same item equal each other, with the other as a js array', function() {
                var items = [
                    new SimpleTextModel('hello1')
                ];

                assert.equal(ImmutableListFactory.create(items).equals(items), true);
            });
            it('should have two arrays with different lengths not equal each other', function() {
                var itemsOne = [
                    new SimpleTextModel('hello1')
                ];

                var itemsTwo = [
                    new SimpleTextModel('hello1'),
                    new SimpleTextModel('hello2')
                ];

                assert.equal(ImmutableListFactory.create(itemsOne).equals(ImmutableListFactory.create(itemsTwo)), false);
            });
            it('should have two arrays with identical lengths but different items not equal each other', function() {
                var itemsOne = [
                    new SimpleTextModel('hello1')
                ];

                var itemsTwo = [
                    new SimpleTextModel('hello2')
                ];

                assert.equal(ImmutableListFactory.create(itemsOne).equals(ImmutableListFactory.create(itemsTwo)), false);
            });
            it('should have two arrays with identical lengths but different items not equal each other, with the other as a js array', function() {
                var itemsOne = [
                    new SimpleTextModel('hello1')
                ];

                var itemsTwo = [
                    new SimpleTextModel('hello2')
                ];

                assert.equal(ImmutableListFactory.create(itemsOne).equals(itemsTwo), false);
            });
            it('should not equal if a parameter is not provided', function() {
                assert.equal(ImmutableListFactory.create().equals(), false);
            });
            it('should not equal if a non-object parameter is provided', function() {
                assert.equal(ImmutableListFactory.create().equals(18), false);
            });
        });
        describe('.values', function() {
            it('should allow enumeration of the values', function() {
                var array = ImmutableListFactory.create([
                    new SimpleTextModel('hello1'),
                    new SimpleTextModel('hello2'),
                    new SimpleTextModel('hello3')
                ]);

                var count = 0;

                array.values.forEach(function() {
                    count++;
                });

                assert.equal(count, 3);
            });
            it('should be frozen', function() {
                var array = ImmutableListFactory.create();

                assert.equal(Object.isFrozen(array.values), true);
            });
            it('should not push an item onto the array', function() {
                var array = ImmutableListFactory.create();

                array.values.push('hello');

                assert.equal(array.values.length, 0);
            });
            it('should not pop an item from the array', function() {
                var array = ImmutableListFactory.create([
                    new SimpleTextModel('hello1')
                ]);

                array.values.pop();

                assert.equal(array.values.length, 1);
            });
            it('should not allow the length to be modified', function() {
                var array = ImmutableListFactory.create([
                    new SimpleTextModel('hello1')
                ]);

                array.values.length = 0;

                assert.equal(array.values.length, 1);
            });
            it('should not allow the values to be reassigned', function() {
                var array = ImmutableListFactory.create([
                    new SimpleTextModel('hello1')
                ]);

                array.values = [];

                assert.equal(array.values.length, 1);
            });
        });
        describe('#push()', function() {
            it('should create a new factory when pushing an item', function() {
                var one = ImmutableListFactory.create();
                var two = one.push(new SimpleTextModel('hello'));

                assert.equal(one !== two, true);
            });
            it('should leave the original array untouched', function() {
                var one = ImmutableListFactory.create();
                one.push(new SimpleTextModel('hello'));

                assert.equal(one.values.length, 0);
            });
            it('should push the item onto the new array', function() {
                var one = ImmutableListFactory.create();
                var two = one.push(new SimpleTextModel('hello'));

                assert.equal(two.values.length, 1);
            });
        });
        describe('#forEach()', function() {
            it('should enumerate the values', function() {
                var one = ImmutableListFactory.create([
                    new SimpleTextModel('hello1'),
                    new SimpleTextModel('hello2'),
                    new SimpleTextModel('hello3')
                ]);

                var count = 0;

                one.forEach(function() {
                    count++;
                });

                assert.equal(count, 3);
            });
        });
        describe('#find()', function() {
            it('should find the first item matching the predicate', function() {
                var array = ImmutableListFactory.create([
                    new SimpleTextModel('hello1'),
                    new SimpleTextModel('hello2'),
                    new SimpleTextModel('hello3')
                ]);

                var item = array.find(function(item, key, values) {
                    return item.text === 'hello2';
                });

                assert.equal(item.text, 'hello2');
            });
            it('should return falsey value when it cant find an item', function() {
                var array = ImmutableListFactory.create([
                    new SimpleTextModel('hello1'),
                    new SimpleTextModel('hello2'),
                    new SimpleTextModel('hello3')
                ]);

                var item = array.find(function(item, key, values) {
                    return item.text === 'hello4';
                });

                assert.equal(!!item, false);
            });
            it('should return falsey when the dictionary is empty', function() {
                var array = ImmutableListFactory.create();

                var item = array.find(function(item, key, values) {
                    return item.text === 'hello4';
                });

                assert.equal(!!item, false);
            });
        });
        describe('#transaction()', function() {
            describe('#set()', function() {
                it('should push an item onto a new array', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction().set([
                        new SimpleTextModel('hello1')
                    ]).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
                it('should remove an item from the new array', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1'),
                        new SimpleTextModel('hello2')
                    ]);
                    var two = one.transaction().set([
                        new SimpleTextModel('hello2')
                    ]).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
            });
            describe('#add()', function() {
                it('should push an item onto a new array', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction().add(0, new SimpleTextModel('hello1')).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
                it('should push an item onto a new array from a callback', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction().add(0, function() {
                        return new SimpleTextModel('hello1');
                    }).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
                it('should push two items onto a new array', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction().add(0, new SimpleTextModel('hello1')).add(0, new SimpleTextModel('hello2')).commit();

                    assert.equal(one !== two && two.length === 2, true);
                });
                it('should ignore the first value and just push the item', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction().add(new SimpleTextModel('hello1')).commit();

                    assert.equal(one !== two && two.length === 1 && two.index(0).text === 'hello1', true);
                });
                it('should ignore the first value and just push the item from a callback', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction().add(function() {
                        return new SimpleTextModel('hello1');
                    }).commit();

                    assert.equal(one !== two && two.length === 1 && two.index(0).text === 'hello1', true);
                });
                it('should pass on key if provided though its unused', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction().add(10, new SimpleTextModel('hello1')).commit();

                    assert.equal(one !== two && two.length === 1 && two.index(0).text === 'hello1', true);
                });
            });
            describe('#addOrUpdate()', function() {
                it('should push an item onto a new array', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction().addOrUpdate(0, new SimpleTextModel('hello1')).commit();

                    assert.equal(one !== two && two.length === 1, true);
                });
                it('should update the item if provided with an existing index', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction()
                        .addOrUpdate(0, new SimpleTextModel('hello1'))
                        .addOrUpdate(0, function() { throw new Error('Should not add!') }, new SimpleTextModel('hello2'))
                        .commit();

                    assert.equal(one !== two && two.length === 1 && two.index(0).text === 'hello2', true);
                });
                it('should update the item if provided with an existing index with a callback', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction()
                        .addOrUpdate(0, new SimpleTextModel('hello1'))
                        .addOrUpdate(0, function() { throw new Error('Should not add!') }, function() {
                            return new SimpleTextModel('hello2');
                        })
                        .commit();

                    assert.equal(one !== two && two.length === 1 && two.index(0).text === 'hello2', true);
                });
            });
            describe('#update()', function() {
                it('should update an item onto a new array', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1')
                    ]);
                    var two = one.transaction().update(0, new SimpleTextModel('hello2')).commit();

                    assert.equal(one !== two && two.length === 1 && two.index(0).text === 'hello2', true);
                });
                it('should do nothing if no index is provided', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1')
                    ]);
                    var two = one.transaction().update(new SimpleTextModel('hello2')).commit();

                    assert.equal(one === two, true);
                });
                it('should update the item if provided with an existing index', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1')
                    ]);
                    var two = one.transaction().update(0, new SimpleTextModel('hello2')).commit();

                    assert.equal(one !== two && two.length === 1 && two.index(0).text === 'hello2', true);
                });
                it('should update the item if provided with an existing index from callback', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1')
                    ]);
                    var two = one.transaction().update(0, function() {
                        return new SimpleTextModel('hello2');
                    }).commit();

                    assert.equal(one !== two && two.length === 1 && two.index(0).text === 'hello2', true);
                });
            });
            describe('#removeWhere()', function() {
                it('should remove an item onto a new array', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1')
                    ]);
                    var two = one.transaction().removeWhere(function() { return true; } ).commit();

                    assert.equal(one !== two && two.length === 0, true);
                });
                it('should keep the same array if no changes were made', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1')
                    ]);
                    var two = one.transaction().removeWhere(function() { return false; } ).commit();

                    assert.equal(one === two, true);
                });
            });
            describe('#remove()', function() {
                it('should remove an item onto a new array', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1')
                    ]);
                    var two = one.transaction().remove(0).commit();

                    assert.equal(one !== two && two.length === 0, true);
                });
                it('should keep the same array if no changes were made', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1')
                    ]);
                    var two = one.transaction().remove(1).commit();

                    assert.equal(one === two, true);
                });
            });
            describe('#clear()', function() {
                it('should clear the array and create a new immutable model', function() {
                    var one = ImmutableListFactory.create([
                        new SimpleTextModel('hello1')
                    ]);
                    var two = one.transaction().clear().commit();

                    assert.equal(one !== two && two.length === 0, true);
                });
                it('should maintain the same array if the original contains no items', function() {
                    var one = ImmutableListFactory.create();
                    var two = one.transaction().clear().commit();

                    assert.equal(one === two, true);
                });
            });
        });
    });
});