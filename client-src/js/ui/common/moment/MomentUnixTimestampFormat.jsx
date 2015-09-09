var moment = require('moment');
var React = require('react');

var Tooltip = require('../Tooltip');

var MomentUnixTimestampFormat = React.createClass({
    getDefaultProps: function() {
        return {
            tooltip: true,
            isVisible: true
        };
    },
    propTypes: {
        seconds: React.PropTypes.number,
        milliseconds: React.PropTypes.number,
        outputFormat: React.PropTypes.string.isRequired,
        tooltip: React.PropTypes.bool,
        isVisible: React.PropTypes.bool
    },
    shouldComponentUpdate: function(nextProps) {
        return this.props.seconds !== nextProps.seconds ||
            this.props.milliseconds !== nextProps.milliseconds ||
            this.props.outputFormat !== nextProps.outputFormat ||
            this.props.isVisible !== nextProps.isVisible;
    },
    render: function() {
        var render = null;

        if (this.props.isVisible) {
            var dateTime = this.props.seconds ? moment.utc(this.props.seconds * 1000) : moment.utc(this.props.milliseconds);
            render = (<span>{dateTime.local().format(this.props.outputFormat)}</span>);

            if (this.props.tooltip) {
                var content = (<span>{dateTime.utc().format()} {dateTime.local().format()}</span>);

                render = (<Tooltip content={content}>{render}</Tooltip>);
            }
        }

        return render;
    }
});

module.exports = MomentUnixTimestampFormat;
