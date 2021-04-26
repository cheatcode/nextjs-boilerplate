const clearTypenameProperties = (unfrozenValue) => {
  if (unfrozenValue && unfrozenValue.__typename)
    delete unfrozenValue.__typename; // eslint-disable-line
  if (typeof unfrozenValue === "object") {
    Object.entries(unfrozenValue).forEach(([key]) => {
      if (unfrozenValue[key] && typeof unfrozenValue[key] === "object") {
        clearTypenameProperties(unfrozenValue[key]);
      }
    });
  }
};

export default (value) => {
  let unfrozenValue = JSON.parse(JSON.stringify(value));

  if (unfrozenValue instanceof Array) {
    unfrozenValue = unfrozenValue.map(({ __typename, ...rest }) => ({
      ...rest,
    }));
  }

  if (unfrozenValue instanceof Object) {
    clearTypenameProperties(unfrozenValue);
  }

  return unfrozenValue;
};
