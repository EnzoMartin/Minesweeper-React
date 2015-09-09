var SuiteFactory = require('../SuiteFactory');
var ImmutableModelFactory = require('../../src/ImmutableModelFactory');

var SimpleFrozenTextImmutableModel = ImmutableModelFactory.extend(function SimpleTextImmutableModel(text) {
    this.text = text;
    Object.freeze(this);
});

SuiteFactory.question(
    'Is assert un-frozen worth disabling in production?',
    'new ImmutableModel() (default) vs new ImmutableModel().assertUnfrozen()',
    'There is an option to disable assertUnfrozen functionality when compiling production code.'
)
    .add('Yep', function() {
        new SimpleFrozenTextImmutableModel('one')
    })
    .add('Nope', function() {
        (new SimpleFrozenTextImmutableModel('one')).assertUnfrozen()
    })

    .run();