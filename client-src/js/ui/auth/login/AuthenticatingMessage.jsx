var React = require('react');
var Loader = require('../../common/Loader');

var AuthenticatingMessage = React.createClass({
    propTypes: {
        isAuthenticating: React.PropTypes.bool.isRequired
    },
    render: function() {
        return (<Loader isVisible={this.props.isAuthenticating} text="Checking credentials"/>);
    }
});

module.exports = AuthenticatingMessage;
