var Dispatcher = require('../Dispatcher');
var AuthConstants = require('./AuthConstants');
var RegisteredStore = require('../RegisteredStore');

var AuthStore = RegisteredStore.create('AuthStore');

var data = {
    isCheckingAuthentication: false,
    isAuthenticating: false,
    isAuthenticated: false,
    user: {},
    errorText: ''
};

function _dispatcher(payload) {
    switch(payload.actionType){
        case AuthConstants.BEGIN_AUTHENTICATION:
            data.isAuthenticating = true;
            data.isAuthenticated = false;
            data.errorText = '';

            AuthStore.emitChange();
            break;
        case AuthConstants.END_AUTHENTICATION_SUCCESS:
            data.isAuthenticating = false;
            data.isAuthenticated = true;
            data.errorText = '';
            data.user = payload.arguments.user;

            AuthStore.emitChange();
            break;
        case AuthConstants.END_AUTHENTICATED_FAILURE:
            data.isAuthenticating = false;
            data.isAuthenticated = false;
            data.errorText = payload.arguments.errorText;

            AuthStore.emitChange();
            break;

        case AuthConstants.BEGIN_CHECK:
            data.isCheckingAuthentication = true;
            data.errorText = '';

            AuthStore.emitChange();
            break;
        case AuthConstants.END_CHECK_SUCCESS:
            data.isCheckingAuthentication = false;
            data.isAuthenticated = true;
            data.errorText = '';
            data.user = payload.arguments.user;

            AuthStore.emitChange();
            break;
        case AuthConstants.END_CHECK_FAILURE:
            data.isCheckingAuthentication = false;
            data.isAuthenticated = false;
            data.errorText = payload.arguments.errorText;

            AuthStore.emitChange();
            break;
    }

    return true;
}

module.exports = AuthStore.assign({
    getDebugData: function(){
        return data;
    },
    isAuthenticating: function() {
        return data.isAuthenticating;
    },
    isCheckingAuthentication: function() {
        return data.isCheckingAuthentication;
    },
    isAuthenticated: function() {
        return data.isAuthenticated;
    },
    errorText: function() {
        return data.errorText;
    },
    getUser: function() {
        return data.user;
    },
    dispatcherIndex: Dispatcher.register(_dispatcher)
});
