var assert = require("assert");
var ImmutableModelFactory = require('../src/ImmutableModelFactory');

describe('ImmutableModelFactory', function() {
    describe('#extend()', function() {
        it('should throw an error when no constructor is provided', function() {
            assert.throws(function() {
                ImmutableModelFactory.extend();
            }, /Missing parameter/);
        });
    });
    describe('#instanceOf()', function() {
        it('should match when provided an ImmutableModel', function() {
            var model = ImmutableModelFactory.extend(function() { });
            assert.equal(ImmutableModelFactory.instanceOf(new model()), true);
        });
        it('shouldn\'t match when provided a normal object', function() {
            assert.equal(ImmutableModelFactory.instanceOf({ }), false);
        });
    });
    describe('#equals()', function() {
        it('should equal when provided with the same object', function() {
            var model = ImmutableModelFactory.extend(function() { });
            var instance = new model();
            assert.equal(ImmutableModelFactory.equals(instance, instance), true);
        });
        it('shouldn\'t equal if second parameter isn\'t provided', function() {
            var model = ImmutableModelFactory.extend(function() { });
            var instance = new model();
            assert.equal(ImmutableModelFactory.equals(instance), false);
        });
        it('should equal if both parameters are not provided', function() {
            assert.equal(ImmutableModelFactory.equals(), true);
        });
        it('should equal when provided with different objects that implement a custom equals method', function() {
            var model = ImmutableModelFactory.extend(function() { });
            model.prototype.equals = function() { return true; };
            assert.equal(ImmutableModelFactory.equals(new model(), new model()), true);
        });
    });
    describe('ImmutableModel', function() {
        describe('#assertUnfrozen()', function() {
            it('should throw an exception if the model is not frozen', function() {
                var model = ImmutableModelFactory.extend(function TestMockedUnfrozenModel() { });

                assert.throws(function() {
                    new model().assertUnfrozen();
                }, /ImmutableModel/);
            });
            it('should throw an exception if the model is frozen, but an object property is not', function() {
                var model = ImmutableModelFactory.extend(function TestMockedUnfrozenModel() {
                    this.one = {};

                    Object.freeze(this);
                });

                assert.throws(function() {
                    new model().assertUnfrozen();
                }, /ImmutableModel/);
            });
            it('should throw an exception if the model is frozen, but an array property is not', function() {
                var model = ImmutableModelFactory.extend(function TestMockedUnfrozenModel() {
                    this.one = [];

                    Object.freeze(this);
                });

                assert.throws(function() {
                    new model().assertUnfrozen();
                }, /ImmutableModel/);
            });
        });
        describe('#equals()', function() {
            var TestMockedValueModel = ImmutableModelFactory.extend(function TestMockedValueModel(value) {
                this.value = value;
            });

            var TestMockedStringModel = ImmutableModelFactory.extend(function TestMockedStringModel(text) {
                this.text = text;
            });

            var TestMockedStringDescriptionModel = ImmutableModelFactory.extend(function TestMockedStringDescriptionModel(text, description) {
                this.text = text;
                this.description = description;
            });

            var TestMockedComplexModel = ImmutableModelFactory.extend(function TestMockedComplexModel(text, stringDescriptionModel) {
                this.text = text;
                this.stringDescriptionModel = stringDescriptionModel;
            });

            it('should equal two different models if their properties match', function() {
                assert.equal(new TestMockedStringModel('hello').equals(new TestMockedStringModel('hello')), true);
            });
            it('should equal two different models if their properties match and the other is a plain js object', function() {
                assert.equal(new TestMockedStringModel('hello').equals({ text: 'hello'}), true);
            });
            it('should not be equal for two different models have different values', function() {
                assert.equal(new TestMockedStringModel('hello1').equals(new TestMockedStringModel('hello2')), false);
            });
            it('should not be equal for two different types with extra property in the other', function() {
                assert.equal(new TestMockedStringModel('hello1').equals(new TestMockedStringDescriptionModel('hello2', 'description')), false);
            });
            it('should not be equal for two different types with extra property in the context', function() {
                assert.equal(new TestMockedStringDescriptionModel('hello2', 'description').equals(new TestMockedStringModel('hello1')), false);
            });
            it('should not be equal for two different types with same number of properties', function() {
                assert.equal(new TestMockedStringModel('hello').equals(new TestMockedValueModel('hello')), false);
            });
            it('should not match two different instances of the same models with different data', function() {
                assert.equal(new TestMockedComplexModel('hello', new TestMockedStringDescriptionModel('world1', 'description')).equals(new TestMockedComplexModel('hello', new TestMockedStringDescriptionModel('world2', 'description'))), false);
            });
            it('should match two different instances of the same models with the same data', function() {
                assert.equal(new TestMockedComplexModel('hello', new TestMockedStringDescriptionModel('world', 'description')).equals(new TestMockedComplexModel('hello', new TestMockedStringDescriptionModel('world', 'description'))), true);
            });
            it('should not equal two different models if this property is set to null', function() {
                assert.equal(new TestMockedStringModel(null).equals(new TestMockedStringModel('hello')), false);
            });
            it('should not equal two different models if the other property is set to null', function() {
                assert.equal(new TestMockedStringModel('hello').equals(new TestMockedStringModel(null)), false);
            });
            it('should not equal if a parameter is not provided', function() {
                assert.equal(new TestMockedStringModel('hello').equals(), false);
            });
            it('should not equal if a non-object parameter is provided', function() {
                assert.equal(new TestMockedStringModel('hello').equals(18), false);
            });
        });
        describe('#transaction()', function() {
            var TestMockedSimpleModel = ImmutableModelFactory.extend(function TestMockedSimpleModel(data) {
                data = data || {};

                this.text = data.text;
                this.number = data.number;

                Object.freeze(this);
            });

            var TestMockedChildrenModel = ImmutableModelFactory.extend(function TestMockedChildrenModel(data) {
                data = data || {};

                this.childOne = data.childOne instanceof TestMockedSimpleModel ? data.childOne : new TestMockedSimpleModel(data.childOne);
                this.childTwo = data.childTwo instanceof TestMockedSimpleModel ? data.childTwo : new TestMockedSimpleModel(data.childTwo);

                Object.freeze(this);
            });

            describe('#set()', function() {
                it('should return the original model if no change is required', function() {
                    var original = new TestMockedSimpleModel({
                        text: 'hello'
                    });

                    var modified = original.transaction().set('text', 'hello').commit();

                    assert.equal(original === modified, true);
                });
                it('should set a string-value pair on the model', function() {
                    var model = new TestMockedSimpleModel().transaction().set('text', 'hello').commit();

                    assert.equal(model.text, 'hello');
                });
                it('should set a string-callback pair on the model', function() {
                    var model = new TestMockedSimpleModel().transaction().set('text', function() {
                        return 'hello';
                    }).commit();

                    assert.equal(model.text, 'hello');
                });
                it('should set an object with a single value on the model', function() {
                    var model = new TestMockedSimpleModel().transaction().set({
                        text: 'hello'
                    }).commit();

                    assert.equal(model.text, 'hello');
                });
                it('should set an object with multiple values on the model', function() {
                    var model = new TestMockedSimpleModel().transaction().set({
                        text: 'hello',
                        number: 5
                    }).commit();

                    assert.equal(model.text, 'hello');
                    assert.equal(model.number, 5);
                });
                it('should set a string-value with a value to null', function() {
                    var model = new TestMockedSimpleModel({
                        text: 'hello'
                    }).transaction().set('text', null).commit();

                    assert.equal(model.text, null);
                });
                it('should set a string-callback with a value to null', function() {
                    var model = new TestMockedSimpleModel({
                        text: 'hello'
                    }).transaction().set('text', function() {
                        return null;
                    }).commit();

                    assert.equal(model.text, null);
                });
                it('should set an object with a value to null', function() {
                    var model = new TestMockedSimpleModel({
                        text: 'hello'
                    }).transaction().set({
                        text: null
                    }).commit();

                    assert.equal(model.text, null);
                });
                it('should set a string-value pair on the model with a falsey value', function() {
                    var model = new TestMockedSimpleModel({
                        text: 'hello'
                    }).transaction().set('text', '').commit();

                    assert.equal(model.text, '');
                });
                it('should set a string-callback pair on the model with a falsey value', function() {
                    var model = new TestMockedSimpleModel({
                        text: 'hello'
                    }).transaction().set('text', function() {
                        return '';
                    }).commit();

                    assert.equal(model.text, '');
                });
                it('should set an object with a single value on the model with a falsey value', function() {
                    var model = new TestMockedSimpleModel({
                        text: 'hello'
                    }).transaction().set({
                        text: ''
                    }).commit();

                    assert.equal(model.text, '');
                });
                it('should maintain a reference on a child property when child would equal the supplied data', function() {
                    var one = new TestMockedChildrenModel({
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
                    var one = new TestMockedChildrenModel();

                    var two = one.transaction().set({
                        childOne: {
                            text: 'hello'
                        }
                    }).commit();

                    assert.equal(one.childTwo === two.childTwo, true);
                });
            });
        });
    });
});