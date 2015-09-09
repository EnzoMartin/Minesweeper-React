var Phauxy = require('../../index');
var TextModel = require('../TextModel');

var results = null;
var textItems = Phauxy.Dictionary({
    World: new TextModel('World'),
    Galaxy: new TextModel('Galaxy'),
    Universe: new TextModel('Universe')
});

// ---

// length = 3
console.log('length = ' + textItems.length);

// ---

// Access the underlying values array, keys and keyToIndex so you can use lodash or others to enumerate the dictionary values.

// [{"text":"World"},{"text":"Galaxy"},{"text":"Universe"}]
console.log(JSON.stringify(textItems.values));
// ["World","Galaxy","Universe"]
console.log(JSON.stringify(textItems.keys));
// {"World":0,"Galaxy":1,"Universe":2}
console.log(JSON.stringify(textItems.keyToIndex));

// ---

textItems.forEach(function(model, key) {
    console.log(key + ' = ' + model.text);
});

// ---

results = textItems.map(function(model, key) {
    return model.text + '!';
});

// ["World!","Galaxy!","Universe!"]
console.log(JSON.stringify(results));

// ---

results = textItems.reduce(function(value, model, key) {
    return value + model.text + ' ~ ';
}, '');

// World ~ Galaxy ~ Universe ~
console.log(results);

// ---

// Most methods in Array.prototype. Dictionary is made to present itself as an array where possible.