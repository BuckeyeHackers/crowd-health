const fs = require('fs');
const path = require('path');
const WatsonVision = require('watson-developer-cloud/visual-recognition/v3');

require('dotenv').config({ path: path.resolve('../.env') }); // eslint-disable-line import/no-extraneous-dependencies, global-require

const WVision = new WatsonVision({
  api_key: process.env.WATSON_VISION_KEY,
  version_date: '2016-05-19',
});

const zipFiles = fs.readdirSync(path.resolve('../lib/web_scraping/pill_images'));

zipFiles.filter(file => file.indexOf('zip') >= 0).forEach((filename) => {
  const pillname = filename.split('/').find(item => item.indexOf('.zip') >= 0).split('.')[0];

  const params = {
    name: pillname,
    [`${pillname}_positive_examples`]: fs.createReadStream(path.resolve(`../lib/web_scraping/pill_images/${filename}`)),
    negative_examples: fs.createReadStream(path.resolve('./Plate.zip')),
  };

  WVision.createClassifier(params, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Created classifier for ${pillname}`); // eslint-disable-line no-console
  });
});
