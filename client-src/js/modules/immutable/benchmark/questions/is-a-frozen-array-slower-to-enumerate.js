var SuiteFactory = require('../SuiteFactory');

var enumerableFrozen = [
    {
        text: 'one'
    },
    {
        text: 'two'
    },
    {
        text: 'three'
    }
];

var enumerableUnfrozen = [
    {
        text: 'one'
    },
    {
        text: 'two'
    },
    {
        text: 'three'
    }
];

Object.freeze(enumerableFrozen);

SuiteFactory.question('Is a frozen array slower to enumerate with forEach?', 'Object.freeze([]).forEach(...) vs [].forEach()')
    .add('Nope', function() {
        var items = [];

        enumerableFrozen.forEach(function(item) {
            items.push(item);
        });
    })

    .add('Yep', function() {
        var items = [];

        enumerableUnfrozen.forEach(function(item) {
            items.push(item);
        });
    })

    .run();


SuiteFactory.question('Is a frozen array slower to enumerate with for( ... )?', 'Object.freeze([]) in for ( ... ) vs [] in for ( ... )')
    .add('Nope', function() {
        var items = [];

        for (var offset = 0; offset < enumerableFrozen.length; offset++) {
            items.push(enumerableFrozen[offset]);
        }
    })

    .add('Yep', function() {
        var items = [];

        for (var offset = 0; offset < enumerableUnfrozen.length; offset++) {
            items.push(enumerableUnfrozen[offset]);
        }
    })

    .run();