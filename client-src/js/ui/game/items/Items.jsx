var React = require('react');
var ItemsStore = require('../../../app/game/ItemsStore');

var Item = require('./Item');
var Bomb = require('./Bomb');

var Items = React.createClass({
    getInitialState: function () {
        return {
            hasFetched: ItemsStore.hasFetched(),
            isFetching: ItemsStore.isFetching(),
            items: ItemsStore.getItems()
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
            items: ItemsStore.getItems()
        });
    },
    render: function() {
        var rows = this.state.items.reduce(function(rows,item){
            rows[item.row] = rows[item.row] || [];
            rows[item.row][item.col] = item.isBomb? (<Bomb key={item.id} item={item}/>) : (<Item key={item.id} item={item}/>);
            return rows;
        },[]).map(function(row,r){
            return (<tr key={'row-' + r}>{row}</tr>);
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
