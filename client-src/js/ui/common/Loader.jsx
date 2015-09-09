var React = require('react');

var Loader = React.createClass({
    getDefaultProps: function() {
        return {
            isVisible: false
        };
    },
    propTypes: {
        text: React.PropTypes.string,
        isVisible: React.PropTypes.bool
    },
    render: function() {
        return this.props.isVisible ? (
            <span><span className="fa fa-spin fa-spinner"></span> {this.props.text ? this.props.text : 'Loading'}...</span>
        ) : null;
    }
});

module.exports = Loader;