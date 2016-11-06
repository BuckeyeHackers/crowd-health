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
        'numbers',
      ],
      optional: [],
    };
  }

  static identipill(pillFile, numbers, name) {
    return super.modelValidations({ pillFile, numbers }, this.identipillAttributes)
      .then(pill => Vision.classify(`${pill.pillFile.destination}/${pill.pillFile.filename}`))
      .then(pillName => TextToSpeech.toSpeech(pillName, `Identified! That's ${pillName}.`).then(pillAudio => ({ pillName, pillAudio })))
      .then(pill => Tropo.sendMessageToNumbers(`${name} has just taken ${pill.pillName}`, JSON.parse(numbers)).then(() => pill));
  }
}

module.exports = Pill;
