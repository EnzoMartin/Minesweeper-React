var React = require('react');
var PlayerActions = require('../../app/game/PlayerActions');
var PlayerStore = require('../../app/game/PlayerStore');
var ItemStore = require('../../app/game/ItemsStore');
var Definitions = require('../../../../config/Definitions');

var _ = require('lodash');
var Serialize = require('form-serialize');

var Util = require('../../app/util/Format');

var HUDIndex = React.createClass({
    getInitialState: function () {
        return {
            hasFetched: ItemStore.hasFetched(),
            isFetching: ItemStore.isFetching(),
            options: ItemStore.getOptions()
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
            options: ItemStore.getOptions()
        });
    },
    _onSubmit: function(event){

    },
    render: function() {
        var difficulties = _.map(Definitions.Difficulties,function(difficulty,id){
            return (<option key={id} value={id}>{difficulty.name} - {difficulty.percent}% Bombs</option>);
        });

        return (
            <header className="navbar navbar-inverse navbar-static-top">
                <div className="container-fluid">
                    <p className="navbar-text navbar-left"><i className="fa fa-bomb"/><strong>Remaining Bombs:</strong> {this.state.options.totalBombs}</p>
                    <form className="navbar-form navbar-right" role="search" onSubmit={this._onSubmit}>
                        <div className="form-group">
                            <select className="form-control" name="difficulty" defaultValue={this.state.options.difficulty}>
                                <option>Select difficulty</option>
                                {difficulties}
                            </select>
                        </div>
                        <div className="input-group">
                            <input type="number" min="1" className="form-control" name="width" defaultValue={this.state.options.width} placeholder="Width" style={{width:80}}/>
                            <input type="number" min="1" className="form-control" name="height" defaultValue={this.state.options.height} placeholder="Height" style={{width:80}}/>
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="button">Play!</button>
                            </span>
                        </div>
                    </form>
                </div>
            </header>
        );
    }
});

module.exports = HUDIndex;
