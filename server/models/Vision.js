const fs = require('fs');
const WatsonVision = require('watson-developer-cloud/visual-recognition/v3');

const WVision = new WatsonVision({
  api_key: process.env.WATSON_VISION_KEY,
  version_date: '2016-05-19',
});

class Vision {
  static classify(imagePath) {
    const params = {
      images_file: fs.createReadStream(imagePath),
    };

    return new Promise((resolve, reject) => {
      WVision.classify(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        const classification = data;
        const pillName = classification.images[0].classifiers[1].name;

        return resolve(pillName);
      });
    });
  }
}

module.exports = Vision;
