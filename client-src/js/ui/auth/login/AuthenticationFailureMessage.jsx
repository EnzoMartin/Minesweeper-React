var React = require('react');
var Alert = require('react-bootstrap/lib/Alert');

var AuthenticationFailureMessage = React.createClass({
    propTypes: {
        errorText: React.PropTypes.string.isRequired
    },
    render: function() {
        return this.props.errorText ? (
            <Alert bsStyle='danger'>
              <h4>Login failed!</h4>
              <p>{this.props.errorText}</p>
            </Alert>
        ) : null;
    }
});

module.exports = AuthenticationFailureMessage;
