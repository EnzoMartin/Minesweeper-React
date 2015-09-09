var assert = require("assert");
var ImmutableModelFactory = require('../src/ImmutableModelFactory');
var ImmutableListFactory = require('../src/ImmutableListFactory');
var ImmutableDictionaryFactory = require('../src/ImmutableDictionaryFactory');
var ImmutableGenericModelFactory = require('../src/ImmutableGenericModelFactory');

describe('ImmutableGenericModelFactory', function() {
    describe('#create()', function() {
        it('should create ImmutableGenericModel of plain child objects', function() {
            var model = ImmutableGenericModelFactory.create({
                child: {
                    text: 'data'
                }
            });

            assert.equal(ImmutableModelFactory.instanceOf(model.child), true)
        });
    });
    describe('ImmutableGenericModel', function() {
        describe('#transaction()', function() {
            describe('#set()', function() {
                it('should maintain the reference if the commit would result in an equal model', function() {
                    var one = ImmutableGenericModelFactory.create({
                        text: 'hello'
                    });

                    var two = one.transaction().set({
                        text: 'hello'
                    }).commit();

                    assert.equal(one === two, true);
                });
                it('should allow arbitrary properties to be added in a transaction', function() {
                    var model = ImmutableGenericModelFactory.create({
                        textOne: '1'
                    }).transaction().set({
                        textTwo: '2'
                    }).commit();

                    assert.equal(model.textTwo === '2', true);
                });
                it('should maintain a reference on a child property when child would equal the supplied data', function() {
                    var one = ImmutableGenericModelFactory.create({
                        childOne: {
                            text: 'hello'
                        }
                    });

                    var two = one.transaction().set({
                        childOne: {
                            text: 'hello'
                        }
                    }).commit();

                    assert.equal(one.childOne === two.childOne, true);
                });
                it('should supply a reference on a child property to the same object when updating a sibling', function() {
                    var one = ImmutableGenericModelFactory.create({
                        childOne: {
                            text: ''
                        },
                        childTwo: {
                            text: 'world'
                        }
                    });

                    var two = one.transaction().set({
                        childOne: {
                            text: 'hello'
                        }
                    }).commit();

                    assert.equal(one.childTwo === two.childTwo, true);
                });

                describe('ImmutableList', function() {
                    it('should maintain the immutable list reference if no change occurred', function() {
                        var one = ImmutableGenericModelFactory.create({
                            child: ImmutableListFactory.create()
                        });

                        var two = one.transaction().set({
                            child: ImmutableListFactory.create()
                        }).commit();

                        assert.equal(one === two, true);
                    });
                    it('should set the items of an immutable list', function() {
                        var model = ImmutableGenericModelFactory.create({
                            child: ImmutableListFactory.create()
                        }).transaction().set({
                            child: ImmutableListFactory.create([
                                {
                                    one: 'two'
                                }
                            ])
                        }).commit();

                        assert.equal(model.child.length, 1);
                    });
                    it('should set the items of an immutable list, taking the item ', function() {
                        var model = ImmutableGenericModelFactory.create({
                            child: ImmutableListFactory.create([
                                {
                                    one: 'two'
                                },
                                {
                                    two: 'two'
                                }
                            ])
                        }).transaction().set({
                            child: ImmutableListFactory.create([
                                {
                                    one: 'two'
                                }
                            ])
                        }).commit();

                        assert.equal(model.child.length, 1);
                    });
                });

                describe('ImmutableDictionary', function() {
                    it('should maintain the immutable dictionary reference if no change occurred', function() {
                        var one = ImmutableGenericModelFactory.create({
                            child: ImmutableDictionaryFactory.create()
                        });

                        var two = one.transaction().set({
                            child: ImmutableDictionaryFactory.create()
                        }).commit();

                        assert.equal(one === two, true);
                    });
                    it('should set the items of an immutable dictionary', function() {
                        var model = ImmutableGenericModelFactory.create({
                            child: ImmutableDictionaryFactory.create()
                        }).transaction().set({
                            child: ImmutableDictionaryFactory.create({
                                one: {
                                    text: 'one'
                                }
                            })
                        }).commit();

                        assert.equal(model.child.length, 1);
                    });
                    it('should set the items of an immutable dictionary, taking the item if it no longer exists', function() {
                        var model = ImmutableGenericModelFactory.create({
                            child: ImmutableDictionaryFactory.create({
                                one: {
                                    text: 'one'
                                },
                                two: {
                                    text: 'two'
                                }
                            })
                        }).transaction().set({
                            child: ImmutableDictionaryFactory.create({
                                one: {
                                    text: 'one'
                                }
                            })
                        }).commit();

                        assert.equal(model.child.length, 1);
                    });
                });
            });
        });
    });
});