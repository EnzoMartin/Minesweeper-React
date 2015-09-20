var React = require('react');

var Item = require('./Item');
var Bomb = require('./Bomb');

var Row = React.createClass({
    shouldComponentUpdate: function(nextProps){
        return nextProps.items === this.props.items;
    },
    render: function() {
        var cols = this.props.items.map(function(item){
            return item.isBomb? (<Bomb key={item.id} item={item}/>) : (<Item key={item.id} item={item}/>);
        });

        return (
            <tr>
                {cols}
            </tr>
        );
    }
});

module.exports = Row;
