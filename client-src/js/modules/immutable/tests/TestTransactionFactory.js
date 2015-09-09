var assert = require("assert");
var TransactionFactory = require('../src/TransactionFactory');

describe('TransactionFactory', function() {
    describe('#create()', function() {
        it('should throw an error when no data is provided', function() {
            assert.throws(function() {
                TransactionFactory.create();
            }, /Missing parameter/);
        });
    });
    describe('Transaction', function() {
        describe('#set()', function() {
            it('should callback with passed in context', function() {
                var context = {};
                TransactionFactory.create({
                    thisArg: context,
                    set: function() {
                        assert.equal(context, this);
                    }
                }).set().commit();
            });
            it('should not throw an error when no callback is provided', function() {
                TransactionFactory.create({}).set().commit();
            });
            it('should wrap a value in a setCallback', function() {
                var value = {};
                TransactionFactory.create({
                    thisArg: context,
                    set: function(transaction, keys, mapping) {
                        assert.equal(value, mapping['property']());
                    }
                }).set('property', value).commit();
            });
            it('should pass functions through as a setCallback', function() {
                var value = {};
                var callback = function() { return value; };
                TransactionFactory.create({
                    thisArg: context,
                    add: function(transaction, keys, mapping) {
                        assert.equal(value, mapping['property']());
                    }
                }).set('property', callback).commit();
            });
            it('should wrap the values of an object with setCallbacks', function() {
                var value = {};
                TransactionFactory.create({
                    thisArg: context,
                    set: function(transaction, keys, mapping) {
                        assert.equal(value, mapping['property']());
                    }
                }).set({
                    property: value
                }).commit();
            });
            it('should pass functions through when assigned to the values of an object', function() {
                var value = {};
                var callback = function() { return value; };
                TransactionFactory.create({
                    thisArg: context,
                    set: function(transaction, keys, mapping) {
                        assert.equal(value, mapping['property']());
                    }
                }).set({
                    property: callback
                }).commit();
            });
        });
    });
});