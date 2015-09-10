var React = require('react');
var RouteHandler = require('../modules/router').statics.RouteHandler;

var Header = require('./game/Header');

var Layout = React.createClass({
    getInitialState: function () {
        return {
            user: {}
        };
    },
    render: function() {
        return (
            <div id="wrapper">
                <Header/>
                <div id="content">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = Layout;