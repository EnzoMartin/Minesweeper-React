var React = require('react');

var SortIcon = React.createClass({
    getDefaultProps: function() {
        return {
            isVisible: false,
            isAscending: true
        };
    },
    propTypes: {
        isAscending: React.PropTypes.bool,
        isVisible: React.PropTypes.bool
    },
    render: function() {
        return this.props.isVisible ? (
            <span className={'fa ' + (this.props.isAscending ? 'fa-sort-asc' : 'fa-sort-desc')}></span>
        ) : null;
    }
});

module.exports = SortIcon;
