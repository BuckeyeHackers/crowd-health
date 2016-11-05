const privatePushToArray = (object, key, value) => {
  if (Array.isArray(object[key])) {
    object[key].push(value);
  } else {
    object[key] = [value]; // eslint-disable-line no-param-reassign
  }
};

const privateModelValidations = (model, modelName, attributes, extraValidations) => {
  const errors = {};
  const sanitizedModel = {};

  // make sure we have the model
  if (!model) {
    privatePushToArray(errors, modelName, `Missing ${modelName} information.`);
    return Promise.reject(errors);
  }

  // make sure all of the required attributes are there
  attributes.required.forEach((attribute) => {
    if (!Object.keys(model).includes(attribute)) {
      privatePushToArray(errors, attribute, `Missing ${attribute}.`);
    } else {
      sanitizedModel[attribute] = model[attribute];
    }
  });

  // copy over the optional attributes
  attributes.optional.forEach((attribute) => {
    if (Object.keys(model).includes(attribute)) {
      sanitizedModel[attribute] = model[attribute];
    }
  });

  // run the extra validations on the attributes if they exist
  if (extraValidations) {
    Object.keys(extraValidations).forEach((key) => {
      if (Object.keys(sanitizedModel).includes(key)) {
        extraValidations[key](errors, sanitizedModel[key]);
      }
    });
  }

  if (Object.keys(errors).length > 0) {
    return Promise.reject(errors);
  }

  return Promise.resolve(sanitizedModel);
};

module.exports = class Model {
  constructor(modelAsJSON) {
    this.constructor.attributes.forEach(attribute => (this[attribute] = modelAsJSON[attribute]));
  }

  toJSON() {
    const modelAsJSON = {};

    this.constructor.attributes.forEach((attribute) => {
      if (this[attribute] && typeof this[attribute].toJSON === 'function') {
        modelAsJSON[attribute] = this[attribute].toJSON();
      } else {
        modelAsJSON[attribute] = this[attribute];
      }
    });

    return modelAsJSON;
  }

  static get modelName() {
    return this.name;
  }

  static get attributes() {
    return [];
  }

  static get createAttributes() {
    return {
      required: [],
      optional: [],
    };
  }

  static get updateAttributes() {
    return {
      required: [],
      optional: [],
    };
  }

  static createValidations(model, extraValidations) {
    return this.modelValidations(model, this.createAttributes, extraValidations);
  }

  static updateValidations(model, extraValidations) {
    return this.modelValidations(model, this.updateAttributes, extraValidations);
  }

  static modelValidations(model, attributes, extraValidations) {
    return privateModelValidations(model, this.modelName.toLowerCase(),
      attributes, extraValidations);
  }

  static pushToArray(object, key, value) {
    privatePushToArray(object, key, value);
  }
};
