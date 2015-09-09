var React = require('react');
var _ = require('lodash');

var DebugStore = require('../../modules/debug/DebugStore');

var StoreItem = require('./StoreItem');

var DebugIndex = React.createClass({
    getInitialState: function () {
        return {
            stores: DebugStore.getStores()
        };
    },
    componentDidMount: function () {
        DebugStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function () {
        DebugStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState({
            games: DebugStore.getStores()
        });
    },
    render: function() {
        var stores = _.chain(this.state.stores)
            .sortBy(function(store){
                return store.name;
            })
            .map(function(store){
                return (<StoreItem key={store.name} store={store} />);
            })
            .value();

        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Debug - Stores</h1>
                        {stores}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DebugIndex;
