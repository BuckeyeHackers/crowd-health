const vision = require('@google-cloud/vision');

const GVision = vision({
  projectId: 'identipill',
  credentials: JSON.parse(process.env.GOOGLE_JSON_STRING),
});

const pills = {
  369: 'Amitriptyline Hydrochloride',
  RX693: 'Clindamycin',
  3240: 'Cymbalta',
  3571: 'Hydrochlorothiazide',
  149: 'Naproxen',
};

class Vision {
  static classify(imagePath) {
    return GVision.detectText(imagePath).then(data => data[0][1])
      .then(text => pills[text]).then(stuff => stuff);
  }
}

module.exports = Vision;
