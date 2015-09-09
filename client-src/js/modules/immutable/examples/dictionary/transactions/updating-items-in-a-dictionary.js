var Phauxy = require('../../../index');
var TextModel = require('../../TextModel');

var textItemsBefore = null;
var textItemsAfter = null;
var textItems = Phauxy.Dictionary();

// ---

// You can add or update with a key-value-pair
textItems = textItems.transaction()
    .addOrUpdate('myKey1', new TextModel('World'))
    .commit();

// 'Hello World!"
console.log("Hello " + textItems.index('myKey1').text + "!");

// ---

// If the key clashes it will be updated
textItems = textItems.transaction()
    .addOrUpdate('myKey1', new TextModel('Galaxy'))
    .commit();

// 'Hello Galaxy!"
console.log("Hello " + textItems.index('myKey1').text + "!");

// ---

// You can update with callbacks. The callbacks are only called if it needs to add or update the item
textItems = textItems.transaction()
    .addOrUpdate('myKey1', function(key) {
        console.error("This won't be called in this example because myKey1 already exists.");
        return new TextModel('World');
    }, function(key, model) {
        return new TextModel('Universe');
    })
    .commit();

// 'Hello Universe!"
console.log("Hello " + textItems.index('myKey1').text + "!");

// ---

// You Note the existing model is returned in the callback. You can use this to make updates, or start a transaction on it
textItems = textItems.transaction()
    .addOrUpdate('myKey1', function(key) {
        console.error("This won't be called in this example because myKey1 already exists.");
        return new TextModel('World');
    }, function(key, model) {
        // 'Hello Universe within update callback!"
        console.log("Hello " + model.text + " within update callback!");

        // We could do some transaction on model here if we wanted, but this example is kept simple.
        return new TextModel('Dimension');
    })
    .commit();

// 'Hello Dimension!"
console.log("Hello " + textItems.index('myKey1').text + "!");

// ---

// You can use the .update() which will only update if the key exists
textItems = textItems.transaction()
    .update('myKey1', new TextModel('Ant Hill'))
    .commit();

// 'Hello Ant Hill!"
console.log("Hello " + textItems.index('myKey1').text + "!");

// ---

// update() also accepts a callback which is only invoked if the item exists
textItems = textItems.transaction()
    .update('myKey2', function(key, model) {
        console.error("This won't be called in this example because myKey1 already exists.");
        return new TextModel('World');
    })
    .commit();

// 'Hello Ant Hill!"
console.log("Hello " + textItems.index('myKey1').text + "!");

// ---

// If the update would result in a dictionary that was equal to the previous, then the original is returned.
// Same applies for addOrUpdate. Adding will always result in a change, updating will be compared to see if a change is required.
textItemsBefore = textItems;
textItemsAfter = textItemsBefore.transaction()
    .update('myKey1', new TextModel('Ant Hill'))
    .commit();

if (textItemsBefore === textItemsAfter) {
    console.log('This should output.'); // And it does.
}
