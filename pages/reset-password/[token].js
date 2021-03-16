import React, { useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import UserForm from "../../components/UserForm";
import { resetPassword as resetPasswordMutation } from "../../graphql/mutations/Users.gql";
import formatGraphqlError from "../../lib/formatGraphqlError";
import ValidatedForm from "../../components/ValidatedForm";
import client from "../../graphql/client";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      repeatNewPassword: "",
    };
  }

  handleResetPassword = () => {
    const { newPassword, repeatNewPassword } = this.state;

    client
      .mutate({
        mutation: resetPasswordMutation,
        variables: {
          token: Router.query.token,
          newPassword,
          repeatNewPassword,
        },
      })
      .then(({ error }) => {
        if (error) {
          pong.danger(formatGraphqlError(error));
        } else {
          pong.success(
            "Password reset! You can log back in with your new password."
          );
          Router.push(`/login`);
        }
      });
  };

  render() {
    const { newPassword, repeatNewPassword } = this.state;

    return (
      <UserForm>
        <ValidatedForm
          rules={{
            newPassword: {
              required: true,
              minLength: 8,
            },
            repeatNewPassword: {
              required: true,
              equals: newPassword,
            },
          }}
          messages={{
            newPassword: {
              required: "New password is required.",
              minLength: "Use at least 8 characters.",
            },
            repeatNewPassword: {
              required: "Must repeat new password.",
              equals: "Passwords must match.",
            },
          }}
          onSubmit={() => {
            console.log("running");
            this.handleResetPassword();
          }}
        >
          <form>
            <div className="field">
              <label className="input-label">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="input"
                placeholder="New Password"
                value={newPassword}
                onChange={(event) =>
                  this.setState({ newPassword: event.target.value })
                }
              />
            </div>
            <div className="field">
              <label className="input-label">Repeat New Password</label>
              <input
                type="password"
                name="repeatNewPassword"
                className="input"
                placeholder="Repeat New Password"
                value={repeatNewPassword}
                onChange={(event) =>
                  this.setState({ repeatNewPassword: event.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="button button-primary button-block"
            >
              Reset Password
            </button>
          </form>
        </ValidatedForm>
      </UserForm>
    );
  }
}

ResetPassword.propTypes = {};

export default ResetPassword;
