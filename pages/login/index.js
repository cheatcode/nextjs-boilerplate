import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import publicRoute from "../../components/PublicRoute";
import ValidatedForm from "../../components/ValidatedForm";
import login from "../../lib/users/login";
import pong from "../../lib/pong";

import StyledLogin from "./index.css";
import formatGraphqlError from "../../lib/formatGraphqlError";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: "",
      password: "",
    };
  }

  handleLogin = () => {
    const { loginOnClient } = this.props;
    const { emailAddress, password } = this.state;

    login({
      emailAddress,
      password,
    })
      .then((user) => {
        Router.push("/documents");
        loginOnClient(user);
      })
      .catch((error) => {
        pong.danger(formatGraphqlError(error));
      });
  };

  render() {
    const { emailAddress, password } = this.state;

    return (
      <StyledLogin>
        <div className="row">
          <div className="col-xs-12 col-lg-5 col-xl-4">
            <ValidatedForm
              rules={{
                emailAddress: {
                  required: true,
                  email: true,
                },
                password: {
                  required: true,
                },
              }}
              messages={{
                emailAddress: {
                  required: "Email address is required.",
                  email: "Is this a valid email?",
                },
                password: {
                  required: "Password is required.",
                },
              }}
              onSubmit={() => {
                this.handleLogin();
              }}
            >
              <form>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="text"
                    name="emailAddress"
                    className="form-control"
                    placeholder="Email Address"
                    value={emailAddress}
                    onChange={(event) =>
                      this.setState({ emailAddress: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">
                    Password{" "}
                    <Link href="/recover-password">
                      <a href="#" className="ms-auto">
                        Forget your password?
                      </a>
                    </Link>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(event) =>
                      this.setState({ password: event.target.value })
                    }
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>
            </ValidatedForm>
          </div>
        </div>
      </StyledLogin>
    );
  }
}

Login.propTypes = {
  loginOnClient: PropTypes.func.isRequired,
};

export default connect(null, (dispatch) => ({
  loginOnClient: (user) => dispatch({ type: "LOGIN", user }),
}))(publicRoute(Login));
