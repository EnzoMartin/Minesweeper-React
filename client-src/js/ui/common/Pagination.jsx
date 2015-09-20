var React = require('react');
var Pagination = require('react-bootstrap/lib/Pagination');

var PaginationWidget = React.createClass({
    getDefaultProps: function() {
        return {
            pages: 1,
            activePage: 1,
            onSelect: function(){},
            maxButtons: 0,
            prev: true,
            next: true,
            ellipsis: true,
            first: true,
            bsStyle: 'default',
            last: true,
            bsSize: 'medium'
        };
    },
    propTypes: {
        pages: React.PropTypes.number,
        activePage: React.PropTypes.number,
        onSelect: React.PropTypes.func,
        maxButtons: React.PropTypes.number,
        prev: React.PropTypes.bool,
        next: React.PropTypes.bool,
        ellipsis: React.PropTypes.bool,
        first: React.PropTypes.bool,
        bsStyle: React.PropTypes.string,
        last: React.PropTypes.bool,
        bsSize: React.PropTypes.string
    },
    render: function() {
        return this.props.pages > 1?(<Pagination
            bsSize={this.props.bsSize}
            bsStyle={this.props.bsStyle}
            items={this.props.pages}
            activePage={this.props.activePage}
            onSelect={this.props.onSelect}
            maxButtons={this.props.maxButtons}
            prev={this.props.prev}
            next={this.props.next}
            first={this.props.first}
            last={this.props.last}
            ellipsis={this.props.ellipsis}/>) : null;
    }
});

module.exports = PaginationWidget;
