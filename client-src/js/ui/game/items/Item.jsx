var React = require('react');
var ItemActions = require('../../../app/game/ItemsActions');

var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    revealItem: function(){
        ItemActions.revealItem(this.props.item);
    },
    render: function() {
        var item = this.props.item;
        var style = {
            left: item.left,
            top: item.top
        };

        return (
            <td className={'item revealed bombs-' + item.label} style={style} onClick={this.revealItem}>{item.label? item.label : null}</td>
        );
    }
});

module.exports = Item;