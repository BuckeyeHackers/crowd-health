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
        'contacts',
        'pillImage',
      ],
      optional: [],
    };
  }

  static identipill(pill) {
    return super.modelValidations(pill, this.identipillAttributes)
      .then(() => new Pill({ pillName: 'test name', pillNameAudio: 'url for audio' }));
  }
}

module.exports = {
  Pill,
};
