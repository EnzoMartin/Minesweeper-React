var React = require('react');

var PulseStore = require('../../modules/pulse/PulseStore');
var MutexStore = require('../../modules/mutex/MutexStore');
var MutexActions = require('../../modules/mutex/MutexActions');

var Mutex = React.createClass({
    getDefaultProps: function() {
        return {
            context: 'global'
        };
    },
    propTypes: {
        context: React.PropTypes.string,
        obtainLock: React.PropTypes.bool.isRequired
    },
    getInitialState: function () {
        return {
            hasLock: false,
            identifier: Math.random()
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if (!this.props.obtainLock && nextProps.obtainLock) {
            MutexActions.requestMutex(nextProps.context || this.props.context, this.state.identifier);
        } else if (this.props.obtainLock && !nextProps.obtainLock) {
            MutexActions.releaseMutex(this.props.context, this.state.identifier);
        }
    },
    componentWillMount: function() {
        MutexStore.addChangeListener(this._onMutexStoreChange);
        PulseStore.addChangeListener(this._onPulseStoreChange);

        if (this.props.obtainLock) {
            MutexActions.requestMutex(this.props.context, this.state.identifier);
        }
    },
    componentWillUnmount: function() {
        MutexStore.removeChangeListener(this._onMutexStoreChange);
        PulseStore.removeChangeListener(this._onPulseStoreChange);

        if(this.state.hasLock){
            MutexActions.releaseMutex(this.props.context, this.state.identifier);
        }
    },
    _onMutexStoreChange: function() {
        this.setState({
            hasLock: MutexStore.hasMutex(this.props.context, this.state.identifier)
        });
    },
    _onPulseStoreChange: function() {
        if (!this.state.hasLock && this.props.obtainLock) {
            MutexActions.requestMutex(this.props.context, this.state.identifier);
        }
    },
    render: function() {
        return this.state.hasLock ? (
            <div>{this.props.children}</div>
        ) : null;
    }
});

module.exports = Mutex;