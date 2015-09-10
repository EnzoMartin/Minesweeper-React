var React = require('react');
var ItemActions = require('../../../app/game/ItemsActions');

var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    flagItem: function(event){
        event.preventDefault();
        event.stopPropagation();
        event.returnValue = false;
        if(!this.props.item.isRevealed){
            ItemActions.toggleFlag(this.props.item);
        }
    },
    render: function(){
        return (
            <td className="item flag" onContextMenu={this.flagItem}><i className="fa fa-flag"/></td>
        );
    }
});

module.exports = Item;