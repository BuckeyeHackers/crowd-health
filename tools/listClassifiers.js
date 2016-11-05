const path = require('path');
const WatsonVision = require('watson-developer-cloud/visual-recognition/v3');

require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies, global-require

const WVision = new WatsonVision({
  api_key: process.env.WATSON_VISION_KEY,
  version_date: '2016-05-19',
});

WVision.listClassifiers({}, (err, data) => {
  if (err) {
    throw err;
  }

  console.log(data); // eslint-disable-line no-console
  console.log(JSON.stringify(data)); // eslint-disable-line no-console
});
