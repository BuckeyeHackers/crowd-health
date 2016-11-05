const Model = require('./Model');

class Pill extends Model {
  static get attributes() {
    return [
      'pillName',
      'pillNameAudio',
    ];
  }

  static get identipillAttributes() {
    return {
      required: [
        'pillFile',
        'contacts',
      ],
      optional: [],
    };
  }

  static identipill(pillFile, contacts) {
    return super.modelValidations({ pillFile, contacts }, this.identipillAttributes)
      .then(() => new Pill({ pillName: 'test name', pillNameAudio: 'url for audio' }));
  }
}

module.exports = {
  Pill,
};
