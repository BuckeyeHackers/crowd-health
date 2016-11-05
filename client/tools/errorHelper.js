const flashMessages = errors => errors.error.map(message => ({ severity: 'danger', text: message }));

const formErrors = (errors) => {
  const errorsWithoutError = { ...errors };
  delete errorsWithoutError.error;
  return errorsWithoutError;
};

export default {
  flashMessages,
  formErrors,
};
