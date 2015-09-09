var Immutable = require('../immutable');

var UserModel = Immutable.Model.Extend(function UserModel(data) {
    this.gravatar = data.gravatar || '';
    this.email = data.email || '';
    this.scope = data.scope || [];
    this.isAdmin = this.scope.indexOf('admin') !== -1;
    this.fullname = data.fullname || '';
    var name = this.fullname.split(',');
    if(name.length > 1){
        this.fullname = name[1].replace(' ','').replace(' - Contractor','') + ' ' + name[0].substr(0,1) + '.';
    }
    this.username = data.username || '';

    Object.freeze(this);
    Object.freeze(this.scope);
});

module.exports = {
    create: function(data) {
        return new UserModel(data).assertUnfrozen();
    }
};