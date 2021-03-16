import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import UserForm from "../../components/UserForm";
import ValidatedForm from "../../components/ValidatedForm";
import login from "../../lib/users/login";
import pong from "../../lib/pong";

import StyledLogin from "./styles";
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
        <UserForm>
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
              <div className="field">
                <label className="input-label">Email Address</label>
                <input
                  type="text"
                  name="emailAddress"
                  className="input"
                  placeholder="Email Address"
                  value={emailAddress}
                  onChange={(event) =>
                    this.setState({ emailAddress: event.target.value })
                  }
                />
              </div>
              <div className="field">
                <label className="input-label">
                  Password{" "}
                  <Link href="/recover-password">Forget your password?</Link>
                </label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="button button-primary button-block"
              >
                Log In
              </button>
            </form>
          </ValidatedForm>
        </UserForm>
      </StyledLogin>
    );
  }
}

Login.propTypes = {
  loginOnClient: PropTypes.func.isRequired,
};

export default connect(null, (dispatch) => ({
  loginOnClient: (user) => dispatch({ type: "LOGIN", user }),
}))(Login);
