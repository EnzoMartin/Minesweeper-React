var React = require('react');

var ErrorMessage = React.createClass({
    getDefaultProps: function() {
        return {
            title: 'Error occurred!',
            message: false
        };
    },
    propTypes: {
        title: React.PropTypes.string,
        message: React.PropTypes.string
    },
    render: function() {
        return this.props.message ? (
            <div className="alert alert-danger" role="alert">
                <strong><i className="fa fa-exclamation-triangle"></i>{this.props.title}</strong>
                <p>{this.props.message}</p>
            </div>
        ) : null;
    }
});

module.exports = ErrorMessage;
