var SuiteFactory = require('../SuiteFactory');

SuiteFactory.question(
    'Bootstrap?'
    )
    .add('Yep', function() {
        Object.keys({}).sort();
    })
    .add('Nope', function() {
        Object.keys({});
    })

    .run();
