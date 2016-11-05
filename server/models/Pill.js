const Model = require('./Model');
const TextToSpeech = require('./TextToSpeech');
const Tropo = require('./Tropo');

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

  static identipill(pillFile, contacts, name) {
    return super.modelValidations({ pillFile, contacts }, this.identipillAttributes)
      .then(pill => ({ pillName: pill.pillFile.originalname }))
      .then(pill => TextToSpeech.toSpeech(pill.pillName, `Identified! That's ${pill.pillName}.`))
      .then(pill => Tropo.sendMessageToNumbers(`${name} has just taken ${pill.pillName}`, JSON.parse(contacts)).then(() => pill));
  }
}

module.exports = Pill;
