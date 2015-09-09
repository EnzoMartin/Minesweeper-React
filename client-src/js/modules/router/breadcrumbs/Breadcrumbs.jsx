var React = require('react');
var RouterBreadcrumbItem = require('./BreadcrumbItem');

var RouterBreadcrumbs = React.createClass({
    propTypes: {
        routes: React.PropTypes.any.isRequired,
        params: React.PropTypes.object
    },
    render: function() {
        var items = this.props.routes.map(function(route, index) {
            var breadcrumbItem = null;

            React.Children.forEach(this.props.children,function(child) {
                if (child.type === RouterBreadcrumbItem && (child.props.to === route.name || child.props.to === route.path)) {
                    breadcrumbItem = child;
                }
            });

            if (!breadcrumbItem) {
                breadcrumbItem = (
                    <RouterBreadcrumbItem key={route.name + route.path} to={route.name || route.path} params={this.props.params} isLinkable={index != this.props.routes.length - 1}>
                        {route.name || '-'}
                    </RouterBreadcrumbItem>
                )
            } else {
                breadcrumbItem = React.cloneElement(breadcrumbItem, {
                    params: this.props.params,
                    isLinkable: index != this.props.routes.length - 1
                })
            }

            return breadcrumbItem;
        }, this);

        return (
            <ol className="breadcrumb">
                {items}
            </ol>
        );
    }
});

module.exports = RouterBreadcrumbs;