var Phauxy = require('../../index');

var genericModelOne = null;
var genericModelTwo = null;

// ---

// Models can be serialized easily.
genericModelOne = Phauxy.Model({
    hello: 'world!'
});

// {"hello":"world!"}
console.log(JSON.stringify(genericModelOne));

// ---

// Generics depth-convert into generic models
genericModelOne = Phauxy.Model({
    hello: 'world!',
    deeper: {
        one: 1
    }
});

// Is genericModelOne.deeper an PhauxyModel: Yes
console.log('Is genericModelOne.deeper an PhauxyModel?: ' + (Phauxy.is(genericModelOne.deeper) ? 'Yes' : 'No'));

// ---

// And still serializes nicely
genericModelOne = Phauxy.Model({
    hello: 'world!',
    deeper: {
        one: 1
    }
});

// {"hello":"world!","deeper":{"one":1}}
console.log(JSON.stringify(genericModelOne));

// ---

// They equal if they are the same reference (identical)
genericModelOne = Phauxy.Model();

// Do the models equal: Yes
console.log('Do the models equal?: ' + (genericModelOne.equals(genericModelOne) ? 'Yes' : 'No'));

// ---

// They equal if they are equal in value but different models. This is a depth equality check
genericModelOne = Phauxy.Model({
    hello: 'world!'
});

genericModelTwo = Phauxy.Model({
    hello: 'world!'
});

// Do the models equal: Yes
console.log('Do the models equal?: ' + (genericModelOne.equals(genericModelTwo) ? 'Yes' : 'No'));

// But are they the exact same model?: No
console.log('But are they the exact same model?: ' + (genericModelOne === genericModelTwo ? 'Yes' : 'No'));

// ---
