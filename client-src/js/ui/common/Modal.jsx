var Modal = require('react-bootstrap').Modal;
var React = require('react');
var Mutex = require('./Mutex');

var ModalItem = React.createClass({
    getDefaultProps: function() {
        return {
            title: '',
            body: '',
            footer: '',
            onHide: function(){},
            isVisible: true
        };
    },
    propTypes: {
        onHide: React.PropTypes.func,
        isVisible: React.PropTypes.bool
    },
    render: function() {
        var footer = this.props.footer? (<Modal.Footer>{this.props.footer}</Modal.Footer>) : null;
        return (
            <Mutex context="dialog" obtainLock={this.props.isVisible}>
                <div className='static-modal'>
                    <Modal
                        show={this.props.isVisible}
                        container={window.document.body}
                        onHide={this.props.onHide}>

                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.props.body}
                        </Modal.Body>
                        {footer}
                    </Modal>
                </div>
            </Mutex>
        );
    }
});

module.exports = ModalItem;