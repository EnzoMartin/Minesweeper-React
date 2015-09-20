var React = require('react');
var ItemsActions = require('../../../app/game/ItemsActions');
var PlayerActions = require('../../../app/game/PlayerActions');
var ItemsStore = require('../../../app/game/ItemsStore');
var PlayerStore = require('../../../app/game/PlayerStore');

var Bomb = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    shouldComponentUpdate: function(nextProps){
        return nextProps.item !== this.props.item;
    },
    _onGameOver: function(){
        if(!this.props.item.isFlag){
            ItemsActions.revealAllItems();
            PlayerActions.gameOver(false);
        }
    },
    _onFlagItem: function(event){
        event.preventDefault();
        event.stopPropagation();
        event.returnValue = false;
        if(this.props.item.isFlag){
            ItemsActions.toggleFlag(this.props.item,false);
        } else if(!this.props.item.isRevealed && ItemsStore.getFlags().length < PlayerStore.getOptions().totalBombs){
            ItemsActions.toggleFlag(this.props.item,true);
        }
    },
    render: function() {
        var item = this.props.item;
        var revealedClass = null;
        var icon = null;

        if(item.isRevealed){
            icon = (<i className="fa fa-bomb"/>);
            revealedClass = ' bomb revealed';
        } else if(item.isFlag) {
            icon = (<i className="fa fa-flag"/>);
            revealedClass = ' flag'
        }

        return (
            <td className={'item ' + revealedClass} onContextMenu={this._onFlagItem} onClick={this._onGameOver}>{icon}</td>
        );
    }
});

module.exports = Bomb;