import React from "react";
import PropTypes from "prop-types";
import validateForm from "../../lib/validateForm";

class ValidatedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.form = React.createRef();
  }

  componentDidMount() {
    this.handleAttachValidation();
  }

  componentDidUpdate() {
    this.handleUpdateValidation();
  }

  handleAttachValidation = () => {
    this.validatedForm = validateForm(this.form, this.props);
  };

  handleUpdateValidation = () => {
    if (this.validatedForm) {
      this.validatedForm.updateOptions(this.props);
    }
  };

  render() {
    const { children } = this.props;

    if (!React.Children.only(children) || children.type !== "form") {
      console.warn("Must pass a single form element to <ValidatedForm />.");
      return null;
    }

    return (
      <React.Fragment>
        {React.cloneElement(children, { ref: (form) => (this.form = form) })}
      </React.Fragment>
    );
  }
}

ValidatedForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ValidatedForm;
