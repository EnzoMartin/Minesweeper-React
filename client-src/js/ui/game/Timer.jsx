var React = require('react');
var PlayerStore = require('../../app/game/PlayerStore');
var PlayerActions = require('../../app/game/PlayerActions');

var Moment = require('moment');

var Header = React.createClass({
    getInitialState: function () {
        return {
            isPlaying: PlayerStore.isPlaying(),
            timeElapsed: PlayerStore.getTimeElapsed()
        };
    },
    componentDidMount: function () {
        PlayerStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function () {
        PlayerStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        var isPlaying = PlayerStore.isPlaying();
        PlayerActions.toggleTimer(isPlaying);

        this.setState({
            isPlaying: isPlaying,
            timeElapsed: PlayerStore.getTimeElapsed()
        });
    },
    //TODO: Change the time elapsed to use Moment's duration object and pretty print time intervals
    render: function() {
        return (
            <p className="navbar-text navbar-left">
                <i className="fa fa-clock-o"/><strong>Time elapsed:</strong> {this.state.timeElapsed? this.state.timeElapsed : '-'}
            </p>
        );
    }
});

module.exports = Header;
