var React = require('react');
var ItemsStore = require('../../../app/game/ItemsStore');

var Row = require('./Row');

var Items = React.createClass({
    getInitialState: function () {
        return {
            hasFetched: ItemsStore.hasFetched(),
            isFetching: ItemsStore.isFetching(),
            items: ItemsStore.getMap()
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
        var rows = this.state.items.map(function(items,i){
            console.log(items);
            return (<Row key={'row-'+i} items={items}/>);
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
