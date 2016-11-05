const Model = require('./Model');
const TextToSpeech = require('./TextToSpeech');

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
      .then(pill => ({ pillName: pill.pillFile.originalname, contacts: JSON.parse(pill.contacts) }))
      .then(pill => TextToSpeech.toSpeech(pill.pillName, `Identified! That's ${pill.pillName}.`));
  }
}

module.exports = Pill;
