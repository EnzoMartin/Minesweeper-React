require('../scss/structure.scss');
//TODO: This can be done more elegantly through the ItemDefinitionsStore
var Items = require('../../config/Definitions').Items;
var _ = require('lodash');

var style = document.createElement('style');
style.appendChild(document.createTextNode(''));
document.head.appendChild(style);
var sheet = style.sheet;

_.each(Items,function(item,id){
    sheet.insertRule('.item.' + id + ' {width:' + item.width +'px; height: ' + item.height + 'px;}',0);
});

module.exports = {};