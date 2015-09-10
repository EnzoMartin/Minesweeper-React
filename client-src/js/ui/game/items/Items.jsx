var React = require('react');
var ItemsStore = require('../../../app/game/ItemsStore');

var Item = require('./Item');
var Flag = require('./Flag');
var Bomb = require('./Bomb');

var Items = React.createClass({
    getInitialState: function () {
        return {
            hasFetched: ItemsStore.hasFetched(),
            isFetching: ItemsStore.isFetching(),
            items: ItemsStore.getMap(),
            ghost: ItemsStore.getGhost()
        };
    },
    componentDidMount: function () {
        ItemsStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function () {
        ItemsStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState({
            hasFetched: ItemsStore.hasFetched(),
            isFetching: ItemsStore.isFetching(),
            items: ItemsStore.getMap()
        });
    },
    render: function() {
        var rows = this.state.items.map(function(row,r){
            var items = row.map(function(item){
                var col = (<Item key={item.id} item={item}/>);
                if(item.isFlag){
                    col = (<Flag key={item.id} item={item}/>);
                } else if(item.isBomb){
                    col = (<Bomb key={item.id} item={item}/>);
                }

                return col;
            });

            return (<tr key={'row-' + r}>{items}</tr>);
        });

        return (
            <table id="items">
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});

module.exports = Items;
