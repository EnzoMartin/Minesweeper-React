var React = require('react');

var DebugStoreItem = React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            name: this.props.store.name,
            data: this.props.store.getDebugData()
        };
    },
    componentDidMount: function () {
        this.props.store.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function () {
        this.props.store.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState({
            name: this.props.store.name,
            data: this.props.store.getDebugData()
        });
    },
    render: function() {
        var name = this.state.name;
        var data = this.state.data;

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="form-group">
                        <label htmlFor="output">{name}</label>
                        <textarea name="output" value={JSON.stringify(data, null, 4)} readOnly className="form-control"/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DebugStoreItem;
