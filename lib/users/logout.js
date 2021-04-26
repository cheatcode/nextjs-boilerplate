/* eslint-disable consistent-return */

import _ from "lodash";
import { logout as logoutMutation } from "../../graphql/mutations/Users.gql";
import client from "../../graphql/client";
import formatErrorString from "../formatErrorString";
import handleApolloResponse from "../handleApolloResponse";
import pong from "../pong";

const handleLogoutRequest = async () => {
  try {
    return client.mutate({
      mutation: logoutMutation,
    });
  } catch (exception) {
    throw new Error(formatErrorString("logout.handleLogoutRequest", exception));
  }
};

const handleLogout = async (options, { resolve, reject }) => {
  try {
    handleLogoutRequest().then((response) => {
      return handleApolloResponse({
        queryName: "logout",
        response,
        onSuccess: (response) => {
          resolve(response);
        },
        onError: (error) => {
          pong.danger(error);
        },
      });
    });
  } catch (exception) {
    reject(formatErrorString("logout", exception));
  }
};

const logout = (options) =>
  new Promise((resolve, reject) => {
    handleLogout(options, { resolve, reject });
  });

export default logout;
