require('../scss/structure.scss');
var Definitions = require('../../config/Definitions');

var style = document.createElement('style');
style.appendChild(document.createTextNode(''));
document.head.appendChild(style);
var sheet = style.sheet;

sheet.insertRule('.item {width:' + Definitions.boxWidth +'px; height: ' + Definitions.boxHeight + 'px;}',0);

document.getElementById('shortcut-icon').href = require('../img/favicon.ico');

module.exports = {};