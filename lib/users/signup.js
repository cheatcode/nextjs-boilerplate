/* eslint-disable consistent-return */

import _ from "lodash";
import { signup as signupMutation } from "../../graphql/mutations/Users.gql";
import client from "../../graphql/client";
import formatErrorString from "../formatErrorString";

const handleSignupRequest = async (user = null) => {
  try {
    return client
      .mutate({
        mutation: signupMutation,
        variables: {
          user,
        },
      })
      .then(({ errors, data }) => {
        if (errors && errors.length > 0) {
          throw new Error(errors[0].message);
        } else {
          return _.get(data, "signup", null);
        }
      });
  } catch (exception) {
    throw new Error(formatErrorString("signup.handleSignupRequest", exception));
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error("options object is required.");
    if (!options.name) throw new Error("options.name is required.");
    if (!options.emailAddress)
      throw new Error("options.emailAddress is required.");
    if (!options.password) throw new Error("options.password is required.");
  } catch (exception) {
    throw new Error(formatErrorString("signup.validateOptions", exception));
  }
};

const handleLoginWithPassword = async (options, { resolve, reject }) => {
  try {
    validateOptions(options);

    const user = await handleSignupRequest(options);

    if (user) {
      resolve(user);
    } else {
      reject();
    }
  } catch (exception) {
    reject(formatErrorString("signup", exception));
  }
};

const signup = (options) =>
  new Promise((resolve, reject) => {
    handleLoginWithPassword(options, { resolve, reject });
  });

export default signup;
