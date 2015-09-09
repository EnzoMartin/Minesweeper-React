var assert = require("assert");
var EnumerableTransactionFactory = require('../src/EnumerableTransactionFactory');

describe('EnumerableTransactionFactory', function() {
    describe('#create()', function() {
        it('should throw an error when no data is provided', function() {
            assert.throws(function() {
                EnumerableTransactionFactory.create();
            }, /Missing parameter/);
        });
    });
    describe('EnumerableTransaction', function() {
        describe('#add()', function() {
            it('should callback with passed in context', function() {
                var context = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    add: function() {
                        assert.equal(context, this);
                    }
                }).add().commit();
            });
            it('should not throw an error when no callback is provided', function() {
                EnumerableTransactionFactory.create({}).add().commit();
            });
            it('should wrap a value in the addCallback', function() {
                var value = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    add: function(transaction, key, addCallback) {
                        assert.equal(value, addCallback());
                    }
                }).add('key', value).commit();
            });
            it('should pass functions through as an addCallback', function() {
                var value = {};
                var callback = function() { return value; };
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    add: function(transaction, key, addCallback) {
                        assert.equal(value, addCallback());
                    }
                }).add('key', callback).commit();
            });
        });
        describe('#addOrUpdate()', function() {
            it('should callback with passed in context', function() {
                var context = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    addOrUpdate: function() {
                        assert.equal(context, this);
                    }
                }).addOrUpdate('key').commit();
            });
            it('should not throw an error when no callback is provided', function() {
                EnumerableTransactionFactory.create({}).addOrUpdate('key').commit();
            });
            it('should throw an error when no key is supplied', function() {
                assert.throws(function() {
                    EnumerableTransactionFactory.create({}).addOrUpdate().commit();
                }, /Missing parameter/);
            });
            it('should wrap a value in the addCallback', function() {
                var value = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    addOrUpdate: function(transaction, key, addCallback) {
                        assert.equal(value, addCallback());
                    }
                }).addOrUpdate('key', value).commit();
            });
            it('should pass functions through as an addCallback', function() {
                var value = {};
                var callback = function() { return value; };
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    addOrUpdate: function(transaction, key, addCallback) {
                        assert.equal(value, addCallback());
                    }
                }).addOrUpdate('key', callback).commit();
            });
            it('should wrap a value in the updateCallback', function() {
                var value = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    addOrUpdate: function(transaction, key, addCallback, updateCallback) {
                        assert.equal(value, updateCallback());
                    }
                }).addOrUpdate('key', function() {}, value).commit();
            });
            it('should pass functions through as an updateCallback', function() {
                var value = {};
                var callback = function() { return value; };
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    addOrUpdate: function(transaction, key, addCallback, updateCallback) {
                        assert.equal(value, updateCallback());
                    }
                }).addOrUpdate('key', function() {}, callback).commit();
            });
            it('should wrap a value in the updateCallback when value is passed to addCallback only', function() {
                var value = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    addOrUpdate: function(transaction, key, addCallback, updateCallback) {
                        assert.equal(value, updateCallback());
                    }
                }).addOrUpdate('key', value).commit();
            });
            it('should pass functions through as an updateCallback when callback is passed to addCallback only', function() {
                var value = {};
                var callback = function() { return value; };
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    addOrUpdate: function(transaction, key, addCallback, updateCallback) {
                        assert.equal(value, updateCallback());
                    }
                }).addOrUpdate('key', callback).commit();
            });
        });
        describe('#update()', function() {
            it('should callback with passed in context', function() {
                var context = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    update: function() {
                        assert.equal(context, this);
                    }
                }).update('key').commit();
            });
            it('should not throw an error when no callback is provided', function() {
                EnumerableTransactionFactory.create({}).update('key').commit();
            });
            it('should throw an error when no key is supplied', function() {
                assert.throws(function() {
                    EnumerableTransactionFactory.create({}).update().commit();
                }, /Missing parameter/);
            });
            it('should wrap a value in the updateCallback', function() {
                var value = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    update: function(transaction, key, updateCallback) {
                        assert.equal(value, updateCallback());
                    }
                }).update('key', value).commit();
            });
            it('should pass functions through as an updateCallback', function() {
                var value = {};
                var callback = function() { return value; };
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    update: function(transaction, key, updateCallback) {
                        assert.equal(value, updateCallback());
                    }
                }).update('key', callback).commit();
            });
        });
        describe('#removeWhere()', function() {
            it('should callback with passed in context', function() {
                var context = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    removeWhere: function() {
                        assert.equal(context, this);
                    }
                }).removeWhere().commit();
            });
            it('should not throw an error when no callback is provided', function() {
                EnumerableTransactionFactory.create({}).removeWhere().commit();
            });
        });
        describe('#remove()', function() {
            it('should callback with passed in context', function() {
                var context = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    remove: function() {
                        assert.equal(context, this);
                    }
                }).remove('key').commit();
            });
            it('should not throw an error when no callback is provided', function() {
                EnumerableTransactionFactory.create({}).remove('key').commit();
            });
            it('should throw an error when no key is supplied', function() {
                assert.throws(function() {
                    EnumerableTransactionFactory.create({}).remove().commit();
                }, /Missing parameter/);
            });
        });
        describe('#clear()', function() {
            it('should callback with passed in context', function() {
                var context = {};
                EnumerableTransactionFactory.create({
                    thisArg: context,
                    clear: function() {
                        assert.equal(context, this);
                    }
                }).clear().commit();
            });
            it('should not throw an error when no callback is provided', function() {
                EnumerableTransactionFactory.create({}).clear().commit();
            });
        });
    });
});