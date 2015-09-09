var moment = require('moment');
var React = require('react');

var MomentDurationHumanize = React.createClass({
    getDefaultProps: function() {
        return {
            isVisible: true
        };
    },
    propTypes: {
        seconds: React.PropTypes.number,
        milliseconds: React.PropTypes.number,
        isVisible: React.PropTypes.bool
    },
    shouldComponentUpdate: function(nextProps) {
        return this.props.seconds !== nextProps.seconds ||
            this.props.milliseconds !== nextProps.milliseconds ||
            this.props.isVisible !== nextProps.isVisible;
    },
    render: function() {
        var render = null;

        if (this.props.isVisible) {
            var milliseconds = this.props.seconds ? this.props.seconds * 1000 : this.props.milliseconds;

            if (milliseconds > 0) {
                render = (<span>{moment.duration(milliseconds).humanize()}</span>);
            } else {
                render = (<span>none</span>);
            }
        }

        return render;
    }
});

module.exports = MomentDurationHumanize;
