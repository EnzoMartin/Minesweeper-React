var React = require('react');
var ItemsActions = require('../../../app/game/ItemsActions');
var ItemsStore = require('../../../app/game/ItemsStore');

var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    revealItem: function(event){
        if(this.props.item.isBomb){
            //TODO: Lose game
        } else if(this.props.item.isFlag){
            //TODO: Handle flag
        } else {
            ItemsActions.revealItem(this.props.item);
        }
    },
    flagItem: function(event){
        event.preventDefault();
        event.stopPropagation();
        event.returnValue = false;
        if(!this.props.item.isRevealed && ItemsStore.getFlags().length < ItemsStore.getOptions().totalBombs){
            ItemsActions.toggleFlag(this.props.item);
        }
    },
    render: function() {
        var item = this.props.item;
        var revealedClass = item.isRevealed? 'bombs-' + item.label + ' revealed' : '';

        return (
            <td className={'item ' + revealedClass} onContextMenu={this.flagItem} onClick={this.revealItem}>{item.isRevealed && item.label? item.label : null}</td>
        );
    }
});

module.exports = Item;