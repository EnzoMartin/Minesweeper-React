var Phauxy = require('../../../index');

// It's all preference, but given I can't overload a constructor in js this is my preferred constructor.

var SingleParameterTextModel = Phauxy.Model.Extend(function SingleParameterTextModel(data) {
    this.text = data.text || '';

    Phauxy.Freezer.freeze(this);
});

// ---

var textItem = new SingleParameterTextModel({
    text: 'World'
});

// 'Hello World!"
console.log("Hello " + textItem.text + "!");

// ---

textItem = textItem.transaction().set('text', 'Solar System').commit();

// 'Hello Solar System!"
console.log("Hello " + textItem.text + "!");

// ---

textItem = textItem.transaction().set('text', function(propertyName, currentValue) {
    return 'Galaxy'
}).commit();

// 'Hello Galaxy!"
console.log("Hello " + textItem.text + "!");

// ---

textItem = textItem.transaction().set({
    text: 'Universe'
}).commit();

// 'Hello Universe!"
console.log("Hello " + textItem.text + "!");

// ---

textItem = textItem.transaction().set({
    text: function(propertyName, currentValue) {
        return 'Dimension';
    }
}).commit();

// 'Hello Dimension!"
console.log("Hello " + textItem.text + "!");
