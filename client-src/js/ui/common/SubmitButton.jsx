var React = require('react');

var SubmitButton = React.createClass({
    getDefaultProps: function() {
        return {
            text: 'Submit',
            className: 'btn btn-primary',
            disabled: false,
            submittingText: 'Submitting..',
            isSubmitting: false
        };
    },
    propTypes: {
        text: React.PropTypes.string,
        submittingText: React.PropTypes.string,
        className: React.PropTypes.string,
        form: React.PropTypes.string,
        isSubmitting: React.PropTypes.bool,
        disabled: React.PropTypes.bool
    },
    render: function() {
        return (
            <button type="submit" form={this.props.form} className={this.props.className} disabled={this.props.isSubmitting || this.props.disabled}>
                <i className="fa fa-spin fa-spinner" style={{display:this.props.isSubmitting?'inline-block':'none'}}></i>{this.props.isSubmitting ? this.props.submittingText : this.props.text}
            </button>
        );
    }
});

module.exports = SubmitButton;