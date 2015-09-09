var Immutable = require('../immutable');
var UserModelFactory = require('./UserModelFactory');

var AuthResponseModel = Immutable.Model.Extend(function AuthResponseModel(data) {
    this.success = data.success || false;
    this.message = data.message || '';
    this.user = UserModelFactory.create(data.user || {});

    Immutable.Freezer.freeze(this);
});

module.exports = {
    create: function(data) {
        return new AuthResponseModel(data).assertUnfrozen();
    }
};