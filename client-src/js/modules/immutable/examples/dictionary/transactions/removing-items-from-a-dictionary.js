var Phauxy = require('../../../index');
var TextModel = require('../../TextModel');

function createTextItemsDictionary() {
    return Phauxy.Dictionary({
        World: new TextModel('World'),
        Galaxy: new TextModel('Galaxy'),
        Universe: new TextModel('Universe')
    });
}

var textItemsBefore = null;
var textItemsAfter = null;
var textItems = null;

// ---

textItems = createTextItemsDictionary();

textItems = textItems.transaction()
    .remove('Galaxy')
    .commit();

// [{"text":"World"},{"text":"Universe"}]
console.log(JSON.stringify(textItems.values));

// ---

textItems = createTextItemsDictionary();

textItems = textItems.transaction()
    .remove('World')
    .remove('Galaxy')
    .commit();

// [{"text":"Universe"}]
console.log(JSON.stringify(textItems.values));

// ---

textItems = createTextItemsDictionary();

textItems = textItems.transaction()
    .removeWhere(function(key, model) {
        return key === 'World';
    })
    .commit();

// [{"text":"Galaxy"},{"text":"Universe"}]
console.log(JSON.stringify(textItems.values));

// ---

textItems = createTextItemsDictionary();

textItems = textItems.transaction()
    .removeWhere(function(key, model) {
        return model.text === 'Universe';
    })
    .commit();

// [{"text":"World"},{"text":"Galaxy"}]
console.log(JSON.stringify(textItems.values));

// ---

// If no items are removed then you get the same dictionary back
textItemsBefore = createTextItemsDictionary();
textItemsAfter = textItemsBefore.transaction()
    .remove('DoesNotExist')
    .commit();

if (textItemsBefore === textItemsAfter) {
    console.log('This should output.'); // And it does.
}
