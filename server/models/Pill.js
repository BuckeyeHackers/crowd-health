const Model = require('./Model');
const TextToSpeech = require('./TextToSpeech');
const Tropo = require('./Tropo');
const Vision = require('./Vision');

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
      .then(pill => Vision.classify(`${pill.pillFile.destination}/${pill.pillFile.filename}`))
      .then(pillName => TextToSpeech.toSpeech(pillName, `Identified! That's ${pillName}.`).then(pillAudio => ({ pillName, pillAudio })))
      .then(pill => Tropo.sendMessageToNumbers(`${name} has just taken ${pill.pillName}`, JSON.parse(contacts)).then(() => pill));
  }
}

module.exports = Pill;
