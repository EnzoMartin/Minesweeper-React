var React = require('react');
var RouteHandler = require('../modules/router').statics.RouteHandler;

var Header = require('./game/Header');

var Layout = React.createClass({
    render: function() {
        return (
            <table id="wrapper">
                <tr>
                    <td style={{height:51}}>
                        <Header/>
                    </td>
                </tr>
                <tr>
                    <td><RouteHandler /></td>
                </tr>
            </table>
        );
    }
});

module.exports = Layout;
