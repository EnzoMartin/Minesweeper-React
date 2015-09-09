var Phauxy = require('../../../index');
var TextModel = require('../../TextModel');

var textItemsBefore = null;
var textItemsAfter = null;
var textItems = Phauxy.Dictionary();

// ---

// You can add with a key-value-pair
textItems = textItems.transaction()
    .add('myKey1', new TextModel('World'))
    .commit();

// 'Hello World!"
console.log("Hello " + textItems.index('myKey1').text + "!");

// ---

// You can add with a callback which is only called if 'myKey2' does not exist in the dictionary
textItems = textItems.transaction()
    .add('myKey2', function(key) {
        return new TextModel('Galaxy');
    })
    .commit();

// 'Hello Galaxy!"
console.log("Hello " + textItems.index('myKey2').text + "!");

// ---

// If the key already exists then you don't create/do anything when using a callback.
textItems = textItems.transaction()
    .add('myKey2', function(key) {
        console.error("I'm never called because myKey2 already exists");
        return new TextModel('Universe');
    })
    .commit();

// 'Hello Galaxy!"
console.log("Hello " + textItems.index('myKey2').text + "!");

// ---

// If no change happens during the transaction you get the same dictionary back.
textItemsBefore = textItems;
textItemsAfter = textItemsBefore.transaction()
    .add('myKey2', function(key) {
        console.error("I'm never called because myKey2 already exists");
        return new TextModel('Universe');
    })
    .commit();

if (textItemsBefore === textItemsAfter) {
    console.log('This should output.'); // And it does.
}
