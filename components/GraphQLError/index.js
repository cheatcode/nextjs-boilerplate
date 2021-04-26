import React from "react";
import PropTypes from "prop-types";

import StyledGraphQLError from "./index.css";

const GraphQLError = ({ error }) => (
  <StyledGraphQLError>
    <header>
      <h4>GraphQL Error</h4>
    </header>
    <div>
      <pre>{error && error.stack}</pre>
    </div>
  </StyledGraphQLError>
);

GraphQLError.propTypes = {
  error: PropTypes.object.isRequired,
};

export default GraphQLError;
