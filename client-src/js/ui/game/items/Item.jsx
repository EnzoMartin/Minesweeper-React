var React = require('react');
var ItemsActions = require('../../../app/game/ItemsActions');
var PlayerActions = require('../../../app/game/PlayerActions');
var ItemsStore = require('../../../app/game/ItemsStore');
var PlayerStore = require('../../../app/game/PlayerStore');

var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    revealItem: function(){
        ItemsActions.revealItem(this.props.item);
        if(ItemsStore.getRemaining() < 1){
            PlayerActions.gameOver(true);
        }
    },
    flagItem: function(event){
        event.preventDefault();
        event.stopPropagation();
        event.returnValue = false;
        if(!this.props.item.isRevealed && ItemsStore.getFlags().length < PlayerStore.getOptions().totalBombs){
            ItemsActions.toggleFlag(this.props.item,true);
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