var React = require('react');

var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    render: function(){
        return (
            <td className="item flag"><i className="fa fa-flag"/></td>
        );
    }
});

module.exports = Item;