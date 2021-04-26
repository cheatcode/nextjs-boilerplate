/* eslint-disable consistent-return */

import _ from "lodash";
import Router from "next/router";
import { loginWithToken as loginWithTokenMutation } from "../../graphql/mutations/Users.gql";
import client from "../../graphql/client";
import formatErrorString from "../formatErrorString";
import handleApolloResponse from "../handleApolloResponse";
import pong from "../pong";

const handleLoginRequest = async () => {
  try {
    return client
      .mutate({
        mutation: loginWithTokenMutation,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
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
    handleLoginRequest().then((response) => {
      return handleApolloResponse({
        queryName: "loginWithToken",
        response,
        onSuccess: (user) => {
          resolve(user);
        },
        onError: (error) => {
          const pathname = Router?.router?.pathname || "";
          const invalidTokenError = error && error.includes("Invalid token.");

          if (invalidTokenError && !pathname.includes("reset-password")) {
            pong.danger(error);
          }

          if (error && !invalidTokenError) {
            pong.danger("Unable to connect to server.");
          }

          resolve(null);
        },
      });
    });
  } catch (exception) {
    reject(formatErrorString("loginWithToken", exception));
  }
};

const loginWithPassword = (options) =>
  new Promise((resolve, reject) => {
    handleLoginWithToken(options, { resolve, reject });
  });

export default loginWithPassword;
