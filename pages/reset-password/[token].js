import React from "react";
import Router from "next/router";
import { resetPassword as resetPasswordMutation } from "../../graphql/mutations/Users.gql";
import publicRoute from "../../components/PublicRoute";
import ValidatedForm from "../../components/ValidatedForm";
import client from "../../graphql/client";
import handleApolloResponse from "../../lib/handleApolloResponse";
import pong from "../../lib/pong";

import StyledResetPassword from "./[token].css";
import formatGraphqlError from "../../lib/formatGraphqlError";

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
      .then((response) => {
        return handleApolloResponse({
          queryName: "resetPassword",
          response,
          onSuccess: () => {
            pong.success(
              "Password reset! You can log back in with your new password."
            );
            Router.push(`/login`);
          },
          onError: (error) => {
            pong.danger(error);
          },
        });
      })
      .catch((error) => {
        pong.error(formatGraphqlError(error));
      });
  };

  render() {
    const { newPassword, repeatNewPassword } = this.state;

    return (
      <StyledResetPassword>
        <div className="row">
          <div className="col-xs-12 col-lg-5 col-xl-4">
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
                this.handleResetPassword();
              }}
            >
              <form>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event) =>
                      this.setState({ newPassword: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Repeat New Password</label>
                  <input
                    type="password"
                    name="repeatNewPassword"
                    className="form-control"
                    placeholder="Repeat New Password"
                    value={repeatNewPassword}
                    onChange={(event) =>
                      this.setState({ repeatNewPassword: event.target.value })
                    }
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                </div>
              </form>
            </ValidatedForm>
          </div>
        </div>
      </StyledResetPassword>
    );
  }
}

ResetPassword.propTypes = {};

export default publicRoute(ResetPassword);
