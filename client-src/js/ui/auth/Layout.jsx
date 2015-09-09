var React = require('react');
var RouteHandler = require('../../modules/router').statics.RouteHandler;

var AuthLayout = React.createClass({
    render: function() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 main">
                        <RouteHandler />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AuthLayout;
