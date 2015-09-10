var React = require('react');
var PlayerStore = require('../../app/game/PlayerStore');
var ItemStore = require('../../app/game/ItemsStore');
var Definitions = require('../../../../config/Definitions');
var ItemActions = require('../../app/game/ItemsActions');

var Modal = require('../common/Modal');

var EndOfRound = React.createClass({
    getInitialState: function () {
        return {
            hasFetched: ItemStore.hasFetched(),
            isFetching: ItemStore.isFetching()
        };
    },
    componentDidMount: function () {
        ItemStore.addChangeListener(this._onStoreChange);
        PlayerStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function () {
        ItemStore.removeChangeListener(this._onStoreChange);
        PlayerStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState({
            hasFetched: ItemStore.hasFetched(),
            isFetching: ItemStore.isFetching(),
            options: ItemStore.getOptions(),
            placedFlags: ItemStore.getFlags().length
        });
    },
    render: function() {
        return (
            <Modal
                title={title}
                body={body}
                footer={}
                onHide={}
                isVisible={this.state.isVisible}
                />
        );
    }
});

module.exports = EndOfRound;
