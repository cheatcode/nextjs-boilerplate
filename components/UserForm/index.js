import React from "react";
import PropTypes from "prop-types";

import StyledUserForm from "./styles";

const UserForm = ({ children }) => <StyledUserForm>{children}</StyledUserForm>;

UserForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserForm;
