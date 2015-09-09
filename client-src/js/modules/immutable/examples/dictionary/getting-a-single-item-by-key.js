var Phauxy = require('../../index');
var TextModel = require('../TextModel');

var textItems = Phauxy.Dictionary({
    myKey: new TextModel('World')
});

// 'Hello World!"
console.log("Hello " + textItems.index('myKey').text + "!");