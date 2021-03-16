/* eslint-disable consistent-return */

import _ from "lodash";
import { logout as logoutMutation } from "../../graphql/mutations/Users.gql";
import client from "../../graphql/client";
import formatErrorString from "../formatErrorString";

const handleLogoutRequest = async () => {
  try {
    return client
      .mutate({
        mutation: logoutMutation,
      })
      .then(({ errors, data }) => {
        if (errors && errors.length > 0) {
          throw new Error(errors[0].message);
        } else {
          return _.get(data, "signup", null);
        }
      });
  } catch (exception) {
    throw new Error(formatErrorString("logout.handleLogoutRequest", exception));
  }
};

const handleLogout = async (options, { resolve, reject }) => {
  try {
    await handleLogoutRequest();

    resolve();
  } catch (exception) {
    reject(formatErrorString("logout", exception));
  }
};

const logout = (options) =>
  new Promise((resolve, reject) => {
    handleLogout(options, { resolve, reject });
  });

export default logout;
