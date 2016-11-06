const Model = require('./Model');
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
      .then(pillName => Tropo.sendMessageToNumbers(`${name} has just taken ${pillName}`, numbers).then(() => ({ pillName })));
  }
}

module.exports = Pill;
