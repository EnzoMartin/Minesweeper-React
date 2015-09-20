var React = require('react');
var TooltipBootstrap = require('react-bootstrap/lib/Tooltip');
var OverlayTriggerBootstrap = require('react-bootstrap/lib/OverlayTrigger');

var Tooltip = React.createClass({
    propTypes: {
        content: React.PropTypes.any
    },
    render: function() {
        var tooltip = (
            <TooltipBootstrap>{this.props.content}</TooltipBootstrap>
        );

        return (
            <OverlayTriggerBootstrap placement="top" overlay={tooltip}>
                {this.props.children}
            </OverlayTriggerBootstrap>
        );
    }
});

module.exports = Tooltip;
