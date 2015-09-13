var React = require('react');
var PlayerStore = require('../../app/game/PlayerStore');
var ItemStore = require('../../app/game/ItemsStore');
var Definitions = require('../../../../config/Definitions');
var ItemActions = require('../../app/game/ItemsActions');

var Modal = require('../common/Modal');

var EndOfRound = React.createClass({
    getInitialState: function () {
        var isGameOver = PlayerStore.isGameOver();
        return {
            hasFetched: ItemStore.hasFetched(),
            isFetching: ItemStore.isFetching(),
            hasWon: PlayerStore.hasWon(),
            isGameOver: isGameOver,
            isVisible: isGameOver
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
        var isGameOver = PlayerStore.isGameOver();
        this.setState({
            hasFetched: ItemStore.hasFetched(),
            isFetching: ItemStore.isFetching(),
            hasWon: PlayerStore.hasWon(),
            isGameOver: isGameOver,
            isVisible: isGameOver == this.state.isGameOver? this.state.isVisible : isGameOver
        });
    },
    _onHide: function(){
        this.setState({
            isVisible: false
        });
    },
    _onPlayAgain: function(){
        var options = ItemStore.getOptions();
        ItemActions.generateMap(options.width,options.height,options.difficulty);
    },
    render: function() {
        var title = 'Oh no! You\'ve lost!';
        var body = 'Don\'t worry, you can try again if you\'d like';
        var footer = (<div>
            <div className="btn btn-default pull-left" onClick={this._onHide}>Change options</div>
            <div className="btn btn-primary" onClick={this._onPlayAgain}>Play again</div>
        </div>);

        if(this.state.hasWon){
            title = 'You\'ve won!';
            body = 'You can play again if you\'d like, maybe try a harder setting?';
        }

        return (
            <Modal
                title={title}
                body={body}
                footer={footer}
                onHide={this._onHide}
                isVisible={this.state.isVisible}
                />
        );
    }
});

module.exports = EndOfRound;
