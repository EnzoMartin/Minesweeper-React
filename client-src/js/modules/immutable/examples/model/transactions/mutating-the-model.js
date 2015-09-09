var Phauxy = require('../../../index');
var TextModel = require('../../TextModel');

function textModelFactory(data) {
    return new TextModel(data.text)
}

// ---

var textItem = new TextModel('World');

// 'Hello World!"
console.log("Hello " + textItem.text + "!");

// ---

textItem = textItem.transaction().set('text', 'Solar System').commit(textModelFactory);

// 'Hello Solar System!"
console.log("Hello " + textItem.text + "!");

// ---

textItem = textItem.transaction().set('text', function(propertyName, currentValue) {
    return 'Galaxy'
}).commit(textModelFactory);

// 'Hello Galaxy!"
console.log("Hello " + textItem.text + "!");

// ---

textItem = textItem.transaction().set({
    text: 'Universe'
}).commit(textModelFactory);

// 'Hello Universe!"
console.log("Hello " + textItem.text + "!");

// ---

textItem = textItem.transaction().set({
    text: function(propertyName, currentValue) {
        return 'Dimension';
    }
}).commit(textModelFactory);

// 'Hello Dimension!"
console.log("Hello " + textItem.text + "!");
