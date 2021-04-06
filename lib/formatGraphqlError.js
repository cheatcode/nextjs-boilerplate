const formatGraphqlError = (errorMessage = "") => {
  const isObject = typeof errorMessage === "object";
  const unformattedMessage = isObject
    ? errorMessage.message || error.message.reason
    : errorMessage;
  const [_, message] = unformattedMessage.split('"');
  return message;
};

export default formatGraphqlError;
