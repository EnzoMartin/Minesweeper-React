var Definitions = require('../../../../config/Definitions');
var AuthConstants = require('./AuthConstants');
var Dispatcher = require('../Dispatcher');
var Request = require('superagent');

var AuthResponseModelFactory = require('./AuthResponseModelFactory');

var LocalStorage = require('../../app/auth/LocalStorage');

module.exports = {
    authenticate: function(email, password) {
        Dispatcher.dispatch({
            actionType: AuthConstants.BEGIN_AUTHENTICATION
        });

        Request
            .post(Definitions.Endpoints.postAuthLogin)
            .send({
                email: email,
                password: password
            })
            .end(function(err,res){
                if(err){
                    Dispatcher.dispatch({
                        actionType: AuthConstants.END_AUTHENTICATED_FAILURE,
                        arguments: {
                            errorText: res.body.message
                        }
                    });
                } else {
                    Dispatcher.dispatch({
                        actionType: AuthConstants.END_AUTHENTICATION_SUCCESS,
                        arguments: {
                            user: res.body.user
                        }
                    });
                }
            });
    },
    check: function() {
        Dispatcher.dispatch({
            actionType: AuthConstants.BEGIN_CHECK
        });

        if(localStorage.length){
            Dispatcher.dispatch({
                actionType: AuthConstants.END_CHECK_SUCCESS,
                arguments: {
                    user: LocalStorage.getAllFromLocal()
                }
            });
        } else {
            Dispatcher.dispatch({
                actionType: AuthConstants.END_CHECK_FAILURE,
                arguments: {
                    errorText: 'No user'
                }
            });
        }
    },
    redirectToIndex: function() {
        window.location.replace('/');
    }
};