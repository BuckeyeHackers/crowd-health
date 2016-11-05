const pushToArray = (object, key, value) => {
  if (Array.isArray(object[key])) {
    object[key].push(value);
  } else {
    object[key] = [value]; // eslint-disable-line no-param-reassign
  }
};

export default pushToArray;
