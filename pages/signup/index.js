import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import UserForm from "../../components/UserForm";
import ValidatedForm from "../../components/ValidatedForm";
import signup from "../../lib/users/signup";
import formatGraphqlError from "../../lib/formatGraphqlError";
import pong from "../../lib/pong";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
    };
  }

  handleSignup = () => {
    const { loginOnClient } = this.props;
    const { firstName, lastName, emailAddress, password } = this.state;

    signup({
      name: {
        first: firstName,
        last: lastName,
      },
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
    const { firstName, lastName, emailAddress, password } = this.state;

    return (
      <UserForm>
        <ValidatedForm
          rules={{
            firstName: {
              required: true,
            },
            lastName: {
              required: true,
            },
            emailAddress: {
              required: true,
              email: true,
            },
            password: {
              required: true,
              minLength: 8,
            },
          }}
          messages={{
            firstName: {
              required: "First name is required.",
            },
            lastName: {
              required: "Last name is required.",
            },
            emailAddress: {
              required: "Email address is required.",
              email: "Is this a valid email?",
            },
            password: {
              required: "Password is required.",
              minLength: "Use at least 8 characters.",
            },
          }}
          onSubmit={() => {
            this.handleSignup();
          }}
        >
          <form>
            <div className="row">
              <div className="col-xs-6">
                <div className="field">
                  <label className="input-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) =>
                      this.setState({ firstName: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-6">
                <div className="field">
                  <label className="input-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) =>
                      this.setState({ lastName: event.target.value })
                    }
                  />
                </div>
              </div>
            </div>
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
              <label className="input-label">Password</label>
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
              <p className="input-hint">Use at least 8 characters.</p>
            </div>
            <button
              type="submit"
              className="button button-primary button-block"
            >
              Sign Up
            </button>
          </form>
        </ValidatedForm>
      </UserForm>
    );
  }
}

Signup.propTypes = {
  loginOnClient: PropTypes.func.isRequired,
};

export default connect(null, (dispatch) => ({
  loginOnClient: (user) => dispatch({ type: "LOGIN", user }),
}))(Signup);
