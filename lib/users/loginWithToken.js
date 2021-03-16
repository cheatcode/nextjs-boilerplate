/* eslint-disable consistent-return */

import _ from "lodash";
import { loginWithToken as loginWithTokenMutation } from "../../graphql/mutations/Users.gql";
import client from "../../graphql/client";
import formatErrorString from "../formatErrorString";

const handleLoginRequest = async () => {
  try {
    return client
      .mutate({
        mutation: loginWithTokenMutation,
      })
      .then(({ errors, data }) => {
        if (errors && errors.length > 0) {
          console.log({ errors });
        } else {
          return _.get(data, "loginWithToken", null);
        }
      });
  } catch (exception) {
    throw new Error(
      formatErrorString("loginWithToken.handleLoginRequest", exception)
    );
  }
};

const handleLoginWithToken = async (options, { resolve, reject }) => {
  try {
    // NOTE: The token login is just an empty request. We do this because
    // we pass the authentication token in the cookies and the GraphQL server
    // looks for that cookie with the token in the context.
    const user = await handleLoginRequest();

    resolve(user);
  } catch (exception) {
    reject(formatErrorString("loginWithToken", exception));
  }
};

const loginWithPassword = (options) =>
  new Promise((resolve, reject) => {
    handleLoginWithToken(options, { resolve, reject });
  });

export default loginWithPassword;
