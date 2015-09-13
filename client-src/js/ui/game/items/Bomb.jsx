var React = require('react');
var ItemsActions = require('../../../app/game/ItemsActions');
var PlayerActions = require('../../../app/game/PlayerActions');
var ItemsStore = require('../../../app/game/ItemsStore');
var PlayerStore = require('../../../app/game/PlayerStore');

var Bomb = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    gameOver: function(){
        ItemsActions.revealAllItems();
        PlayerActions.gameOver(false);
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
        var revealedClass = item.isRevealed? ' bomb revealed' : '';
        var icon = item.isRevealed? (<i className="fa fa-bomb"/>) : null;

        return (
            <td className={'item ' + revealedClass} onContextMenu={this.flagItem} onClick={this.gameOver}>{icon}</td>
        );
    }
});

module.exports = Bomb;