var React = require('react');
var ItemActions = require('../../../app/game/ItemsActions');

var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    gameOver: function(){
        ItemActions.revealAllItems();
    },
    render: function() {
        var item = this.props.item;
        var revealedClass = item.isRevealed? ' revealed' : '';

        return (
            <td className={'item bomb' + revealedClass} onClick={this.gameOver}><i className="fa fa-bomb"/></td>
        );
    }
});

module.exports = Item;