var React = require('react');
var ItemsActions = require('../../../app/game/ItemsActions');
var PlayerActions = require('../../../app/game/PlayerActions');
var ItemsStore = require('../../../app/game/ItemsStore');
var PlayerStore = require('../../../app/game/PlayerStore');

var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    shouldComponentUpdate: function(nextProps){
        return nextProps.item !== this.props.item;
    },
    _onRevealItem: function(){
        if(!this.props.item.isFlag){
            ItemsActions.revealItem(this.props.item);
            if(ItemsStore.getRemaining() < 1){
                PlayerActions.gameOver(true);
            }
        }
    },
    _onToggleFlag: function(event){
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
        var revealedClass = item.isFlag? 'flag' : (item.isRevealed? 'bombs-' + item.label + ' revealed' : '');
        var text = item.isFlag? (<i className="fa fa-flag"/>) : (item.isRevealed && item.label? item.label : null);

        return (
            <td className={'item ' + revealedClass} onContextMenu={this._onToggleFlag} onClick={this._onRevealItem}>{text}</td>
        );
    }
});

module.exports = Item;