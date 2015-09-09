var React = require('react');
var Link = require('../').statics.Link;

var RouterBreadcrumbItem = React.createClass({
    getDefaultProps: function() {
        return {
            isLinkable: true,
            isVisible: true
        };
    },
    propTypes: {
        to: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        isVisible: React.PropTypes.bool,
        isLinkable: React.PropTypes.bool
    },
    render: function(){
        var breadcrumb = null;
        if(this.props.isVisible && this.props.children){
            breadcrumb = this.props.isLinkable? (
                <li>
                    <Link to={this.props.to} params={this.props.params}>{this.props.children}</Link>
                </li>
            ) : (
                    <li>{this.props.children}</li>
            );
        }

        return breadcrumb;
    }
});

module.exports = RouterBreadcrumbItem;
