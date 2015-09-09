var React = require('react');
var _ = require('lodash');
var Immutable = require('../../modules/immutable');

var RouterStore = require('../../modules/router/RouterStore');
var RouterBreadcrumbs = require('../../modules/router/breadcrumbs/Breadcrumbs');
var RouterBreadcrumbItem = require('../../modules/router/breadcrumbs/BreadcrumbItem');

function getState() {
    var routes = RouterStore.getFlattenedRoutes();
    var params = RouterStore.getParams();

    return {
        routes: routes,
        params: params,
        ready: true
    };
}

var Breadcrumbs = React.createClass({
    getInitialState: getState,
    componentDidMount: function () {
        RouterStore.addChangeListener(this._onStoreChange);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        // If we have no routes/params or they have changed (most common update of this component)
        return (!this.state.routes || !this.state.routes.equals(nextState.routes)) ||
            (!this.state.params || !this.state.params.equals(nextState.params)) ||
            (this.state.ready !== nextState.ready);
    },
    componentWillUnmount: function () {
        RouterStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState(getState());
    },
    render: function() {
        return this.state.ready? (
            <RouterBreadcrumbs routes={this.state.routes} params={this.state.params}>
                <RouterBreadcrumbItem key="home" to="/">Home</RouterBreadcrumbItem>
                <RouterBreadcrumbItem key="game" to="game">Game</RouterBreadcrumbItem>
                <RouterBreadcrumbItem key="debug" to="debug">Debug</RouterBreadcrumbItem>
            </RouterBreadcrumbs>
        ) : (
            <ol className="breadcrumb">
                <li><a href="/">Home</a></li>
            </ol>
        );
    }
});

module.exports = Breadcrumbs;