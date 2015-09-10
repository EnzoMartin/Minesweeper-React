var React = require('react');
var ItemActions = require('../../../app/game/ItemsActions');

var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    revealItem: function(){
        if(this.props.item.isBomb){
            //TODO: Lose game
        } else if(this.props.item.isFlag){
            //TODO: Handle flag
        } else {
            ItemActions.revealItem(this.props.item);
        }
    },
    render: function() {
        var item = this.props.item;
        var revealedClass = item.isRevealed? 'bombs-' + item.label + ' revealed' : '';

        return (
            <td className={'item ' + revealedClass} onClick={this.revealItem}>{item.isRevealed && item.label? item.label : null}</td>
        );
    }
});

module.exports = Item;