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
        var style = {
            left: item.left,
            top: item.top
        };

        return (
            <td className="item bomb" style={style} onClick={this.gameOver}><i className="fa fa-bomb"/></td>
        );
    }
});

module.exports = Item;