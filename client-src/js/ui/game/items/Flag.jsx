var React = require('react');

var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    render: function() {
        var item = this.props.item;
        var style = {
            left: item.left,
            top: item.top
        };

        return (
            <td className="item flag" style={style}><i className="fa fa-flag"/></td>
        );
    }
});

module.exports = Item;