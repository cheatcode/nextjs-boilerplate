import pong from "./pong";

const handleApolloResponse = (options = {}) => {
  if (options?.response instanceof Error) {
    const isServerUnavailableError = options?.response?.message.includes(
      "Failed to fetch"
    );
    return pong.danger({
      title: isServerUnavailableError ? options.response : "",
      message: isServerUnavailableError
        ? "It looks like the server is currently unavailable. Please try again."
        : "",
    });
  }

  if (options.response && !(options.response instanceof Error)) {
    if (options.response?.errors?.length > 0 && options.onError) {
      // NOTE: Replace unnecessary prefix returned by Apollo.
      return options.onError(
        options.response.errors[0]?.message
          .replace("Unexpected error value: ", "")
          .replace(/\"/g, "")
      );
    }

    if (!options.response?.errors) {
      const data = options?.response?.data[options.queryName];
      return options.onSuccess(data || null);
    }
  }

  return null;
};

export default handleApolloResponse;
