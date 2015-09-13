var React = require('react');
var ItemsActions = require('../../../app/game/ItemsActions');

var Flag = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    flagItem: function(event){
        event.preventDefault();
        event.stopPropagation();
        event.returnValue = false;
        if(!this.props.item.isRevealed){
            ItemsActions.toggleFlag(this.props.item,false);
        }
    },
    render: function(){
        return (
            <td className="item flag" onContextMenu={this.flagItem}><i className="fa fa-flag"/></td>
        );
    }
});

module.exports = Flag;