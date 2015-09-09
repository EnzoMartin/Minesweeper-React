var React = require('react');
var AuthActions = require('../../../modules/auth/AuthActions');

var AuthLoginForm = React.createClass({
    propTypes: {
        isCheckingCredentials: React.PropTypes.bool.isRequired
    },
    getInitialState: function () {
        return {
            email: '',
            password: ''
        };
    },
    _onFieldChange: function(event) {
        var state = {};

        state[event.target.name] = event.target.value;

        this.setState(state);
    },
    _onSubmit: function(event) {
        event.preventDefault();

        AuthActions.authenticate(this.state.email, this.state.password);
    },
    render: function() {
        return (
            <form onSubmit={this._onSubmit}>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={this.state.email} onChange={this._onFieldChange} required="true" className="required form-control" placeholder="ex: name@email.com"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this._onFieldChange} required="true" className="required form-control"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <button className="btn btn-success" disabled={this.props.isCheckingCredentials}>Login</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = AuthLoginForm;
