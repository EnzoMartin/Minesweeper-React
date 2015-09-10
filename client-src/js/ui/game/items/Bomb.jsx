var React = require('react');
var ItemsActions = require('../../../app/game/ItemsActions');
var PlayerActions = require('../../../app/game/PlayerActions');
var ItemsStore = require('../../../app/game/ItemsStore');

var Bomb = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    gameOver: function(){
        ItemsActions.revealAllItems();
        PlayerActions.gameOver();
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
        var revealedClass = item.isRevealed? ' bomb revealed' : '';
        var icon = item.isRevealed? (<i className="fa fa-bomb"/>) : null;

        return (
            <td className={'item ' + revealedClass} onContextMenu={this.flagItem} onClick={this.gameOver}>{icon}</td>
        );
    }
});

module.exports = Bomb;