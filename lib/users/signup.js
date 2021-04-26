/* eslint-disable consistent-return */

import _ from "lodash";
import { signup as signupMutation } from "../../graphql/mutations/Users.gql";
import client from "../../graphql/client";
import formatErrorString from "../formatErrorString";
import handleApolloResponse from "../handleApolloResponse";
import pong from "../pong";

const handleSignupRequest = async (user = null) => {
  try {
    return client.mutate({
      mutation: signupMutation,
      variables: {
        user,
      },
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

    handleSignupRequest(options).then((response) => {
      return handleApolloResponse({
        queryName: "signup",
        response,
        onSuccess: (user) => {
          resolve(user);
        },
        onError: (error) => {
          pong.danger(error);
        },
      });
    });
  } catch (exception) {
    reject(formatErrorString("signup", exception));
  }
};

const signup = (options) =>
  new Promise((resolve, reject) => {
    handleLoginWithPassword(options, { resolve, reject });
  });

export default signup;
