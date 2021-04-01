import React from "react";
import { recoverPassword as recoverPasswordMutation } from "../../graphql/mutations/Users.gql";
import ValidatedForm from "../../components/ValidatedForm";
import pong from "../../lib/pong";
import formatGraphqlError from "../../lib/formatGraphqlError";
import client from "../../graphql/client";

import StyledRecoverPassword from "./styles";

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
    };
  }

  handleRecoverPassword = () => {
    const { emailAddress } = this.state;

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
      <StyledRecoverPassword>
        <div className="row">
          <div className="col-xs-12 col-lg-5 col-xl-4">
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
                <div className="mb-4">
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
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Request Password Reset
                  </button>
                </div>
              </form>
            </ValidatedForm>
          </div>
        </div>
      </StyledRecoverPassword>
    );
  }
}

RecoverPassword.propTypes = {};

export default RecoverPassword;
