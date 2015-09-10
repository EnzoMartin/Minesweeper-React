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
            isFetching: ItemStore.isFetching(),
            hasWon: PlayerStore.hasWon(),
            isGameOver: PlayerStore.isGameOver()
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
            hasWon: PlayerStore.hasWon(),
            isGameOver: PlayerStore.isGameOver()
        });
    },
    _onHide: function(){
        this.setState({
            isGameOver: false
        });
    },
    render: function() {
        var title = 'Oh no! You\'ve lost!';
        var body = 'Don\'t worry, you can try again if you\'d you like';
        var footer = '';

        if(this.state.hasWon){
            title = 'You\'ve won!';
            body = 'You can play again if you\'d you like, maybe try a harder setting?';
            footer = '';
        }

        return (
            <Modal
                title={title}
                body={body}
                footer={footer}
                onHide={this._onHide}
                isVisible={this.state.isGameOver}
                />
        );
    }
});

module.exports = EndOfRound;
