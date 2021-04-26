import React from "react";
import PropTypes from "prop-types";

import StyledBlankState from "./index.css";

const BlankState = ({
  dashed,
  bordered,
  transparent,
  title,
  subtitle,
  action,
}) => (
  <StyledBlankState
    className={`blank-state${dashed ? " dashed" : ""}${
      bordered ? " bordered" : ""
    }${transparent ? " transparent" : ""}`}
  >
    <h5>{title}</h5>
    <p>{subtitle}</p>
    {action && (
      <button
        className={`btn btn-${action.style || "primary"}`}
        onClick={action.onClick || null}
      >
        {action.label || ""}
      </button>
    )}
  </StyledBlankState>
);

BlankState.defaultProps = {
  dashed: false,
  bordered: false,
  transparent: false,
  action: null,
};

BlankState.propTypes = {
  dashed: PropTypes.bool,
  bordered: PropTypes.bool,
  transparent: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  action: PropTypes.object,
};

export default BlankState;
