import React, { useState } from "react";
import PropTypes from "prop-types";
import { recoverPassword as recoverPasswordMutation } from "../../graphql/mutations/Users.gql";
import UserForm from "../../components/UserForm";
import ValidatedForm from "../../components/ValidatedForm";
import pong from "../../lib/pong";
import formatGraphqlError from "../../lib/formatGraphqlError";
import client from "../../graphql/client";

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
    };
  }

  handleRecoverPassword = () => {
    const { emailAddress } = this.state;

    console.log("running");

    client
      .mutate({
        mutation: recoverPasswordMutation,
        variables: {
          emailAddress,
        },
      })
      .then(() => {
        pong.success(
          `Click the link in the email we just sent you to reset your password!`
        );
      })
      .catch((error) => {
        pong.danger(formatGraphqlError(error));
      });
  };

  render() {
    const { emailAddress } = this.state;

    return (
      <UserForm>
        <ValidatedForm
          rules={{
            emailAddress: {
              required: true,
              email: true,
            },
          }}
          messages={{
            emailAddress: {
              required: "Email address is required.",
              email: "Is this email valid?",
            },
          }}
          onSubmit={() => {
            this.handleRecoverPassword();
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
            <button
              type="submit"
              className="button button-primary button-block"
            >
              Request Password Reset
            </button>
          </form>
        </ValidatedForm>
      </UserForm>
    );
  }
}

RecoverPassword.propTypes = {};

export default RecoverPassword;
