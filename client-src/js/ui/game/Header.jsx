var React = require('react');
var PlayerStore = require('../../app/game/PlayerStore');
var ItemStore = require('../../app/game/ItemsStore');
var Definitions = require('../../../../config/Definitions');
var PlayerActions = require('../../app/game/PlayerActions');

var _ = require('lodash');
var Serialize = require('form-serialize');

var Util = require('../../app/util/Format');
var Timer = require('./Timer');

var Header = React.createClass({
    getInitialState: function () {
        return {
            hasFetched: ItemStore.hasFetched(),
            isFetching: ItemStore.isFetching(),
            options: PlayerStore.getOptions(),
            isPlaying: PlayerStore.isPlaying(),
            placedFlags: ItemStore.getFlags().length
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
            options: PlayerStore.getOptions(),
            isPlaying: PlayerStore.isPlaying(),
            placedFlags: ItemStore.getFlags().length
        });
    },
    _onSubmit: function(event){
        event.preventDefault();
        var form = Serialize(event.target,{hash:true});
        PlayerActions.generateMap(
            parseInt(form.width,10),
            parseInt(form.height,10),
            parseInt(form.difficulty,10)
        );
    },
    render: function() {
        var difficulties = _.map(Definitions.Difficulties,function(difficulty,id){
            return (<option key={id} value={id}>{difficulty.name} - {difficulty.percent}% Bombs</option>);
        });

        return (
            <header className="navbar navbar-inverse navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="https://github.com/EnzoMartin/Minesweeper-React" target="_blank"><i className="fa fa-github"/>View Source</a>
                    </div>
                    <p className="navbar-text navbar-left">
                        <i className="fa fa-bomb"/><strong>Bombs:</strong> {this.state.options.totalBombs}
                    </p>
                    <p className="navbar-text navbar-left">
                        <i className="fa fa-flag"/><strong>Flags Placed:</strong> {this.state.placedFlags} of {this.state.options.totalBombs}
                    </p>
                    <Timer/>
                    <form className="navbar-form navbar-right" role="search" onSubmit={this._onSubmit}>
                        <div className="form-group">
                            <p className="form-control-static pull-left">Difficulty:</p>
                            <select className="form-control" name="difficulty" required={true} defaultValue={this.state.options.difficulty}>
                                <option value="">Select difficulty</option>
                                {difficulties}
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="number" min="1" className="form-control" name="height" required={true} defaultValue={this.state.options.height} placeholder="Height" style={{width:80}}/>
                            <p className="form-control-static">Row(s) by</p>
                            <input type="number" min="1" className="form-control" name="width" required={true} defaultValue={this.state.options.width} placeholder="Width" style={{width:80}}/>
                            <p className="form-control-static">Column(s)</p>
                            <button className="btn btn-primary" type="submit">{this.state.isPlaying? 'Restart' : 'Play!'}</button>
                        </div>
                    </form>
                </div>
            </header>
        );
    }
});

module.exports = Header;
