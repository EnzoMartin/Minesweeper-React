var React = require('react');

var AuthStore = require('../../../modules/auth/AuthStore');
var AuthActions = require('../../../modules/auth/AuthActions');

var LoginForm = require('./LoginForm');
var AuthenticatingMessage = require('./AuthenticatingMessage');
var AuthenticationFailureMessage = require('./AuthenticationFailureMessage');

var LocalStorage = require('../../../app/auth/LocalStorage');

var AuthLoginIndex = React.createClass({
    getInitialState: function () {
        return {
            isAuthenticated: AuthStore.isAuthenticated(),
            isAuthenticating: AuthStore.isAuthenticating(),
            errorText: AuthStore.errorText()
        };
    },
    componentDidMount: function () {
        AuthStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function () {
        AuthStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        var isAuthenticated = AuthStore.isAuthenticated();

        if (isAuthenticated) {
            LocalStorage.saveToLocal(AuthStore.getUser());
            AuthActions.redirectToIndex();
        }

        this.setState({
            isAuthenticated: isAuthenticated,
            isAuthenticating: AuthStore.isAuthenticating(),
            errorText: AuthStore.errorText()
        });
    },
    render: function() {
        return (
            <div className="wrapper">
                <table className="table">
                    <tr>
                        <td width="33%"></td>
                        <td width="33%">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <h2>Login</h2>
                                    <hr/>
                                    <AuthenticationFailureMessage errorText={this.state.errorText} />
                                    <LoginForm isCheckingCredentials={this.state.isAuthenticating} />
                                    <AuthenticatingMessage isAuthenticating={this.state.isAuthenticating} />
                                </div>
                            </div>
                        </td>
                        <td width="33%"></td>
                    </tr>
                </table>
            </div>
        );
    }
});

module.exports = AuthLoginIndex;
