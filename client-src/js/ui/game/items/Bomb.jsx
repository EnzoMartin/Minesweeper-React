var React = require('react');
var ItemsActions = require('../../../app/game/ItemsActions');
var PlayerActions = require('../../../app/game/PlayerActions');

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
        var revealedClass = item.isRevealed? ' revealed' : '';
        var icon = item.isRevealed? (<i className="fa fa-bomb"/>) : (<i className="fa fa-bomb"/>);

        return (
            <td className={'item bomb' + revealedClass} onContextMenu={this.flagItem} onClick={this.gameOver}>{icon}</td>
        );
    }
});

module.exports = Bomb;