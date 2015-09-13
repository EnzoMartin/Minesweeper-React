var React = require('react');
var Modal = require('react-bootstrap').Modal;

var ConfirmationDialog = React.createClass({
    getDefaultProps: function() {
        return {
            isVisible: false
        };
    },
    propTypes: {
        isVisible: React.PropTypes.bool,
        title: React.PropTypes.string.isRequired,
        body: React.PropTypes.string.isRequired,
        onConfirm: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired
    },
    _onCancel: function() {
        this.props.onCancel();
    },
    _onConfirm: function() {
        this.props.onConfirm();
    },
    render: function() {
        return (
            <div className="static-modal">
                <Modal show={true} enforceFocus={false} autoFocus={false} backdrop={true} animation={true} container={window.document.body} onHide={this._onCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.body}</Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default" onClick={this._onCancel}>Cancel</button>
                        <button className="btn btn-primary" onClick={this._onConfirm}>Confirm</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

module.exports = ConfirmationDialog;
