module.exports = class Controller {
  static errorJSON(status, error) {
    let errors = error;

    if (Array.isArray(errors)) {
      errors = {
        error: errors,
      };
    } else if (!(errors !== null && typeof errors === 'object')) {
      errors = {
        error: [
          errors,
        ],
      };
    }

    return {
      status,
      errors,
    };
  }

  static dataJSON(data) {
    return {
      data,
    };
  }
};
