const fs = require('fs');
const path = require('path');
const WatsonTTS = require('watson-developer-cloud/text-to-speech/v1');

const padDate = (segment) => {
  const newSegment = segment.toString();
  return newSegment[1] ? newSegment : `0${newSegment}`;
};

const yyyymmddhhmmss = () => {
  const d = new Date();
  return d.getFullYear().toString() +
    padDate(d.getMonth() + 1) +
    padDate(d.getDate()) +
    padDate(d.getHours()) +
    padDate(d.getMinutes()) +
    padDate(d.getSeconds());
};

const TTS = new WatsonTTS({
  username: process.env.WATSON_SPEECH_USERNAME,
  password: process.env.WATSON_SPEECH_PASSWORD,
});

class TextToSpeech {
  static toSpeech(pillName, text) {
    const fileLocation = path.resolve('./public/tts', `${yyyymmddhhmmss()}_${pillName.split(/\s+/).join('_')}.wav`);

    const params = {
      voice: 'en-US_AllisonVoice',
      accept: 'audio/wav',
      text,
    };

    return new Promise((resolve, reject) => {
      TTS.synthesize(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        fs.appendFileSync(fileLocation, data);
        return resolve({ pillName, pillAudio: fileLocation });
      });
    });
  }
}

module.exports = TextToSpeech;
