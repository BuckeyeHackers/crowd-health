const express = require('express');

const { PillController } = require('../controllers');

const apiSubApp = express();
const router = new express.Router();

router.setup = (app) => {
  app.post('/identipill', PillController.identipill);
};

apiSubApp.use('/', router);
router.setup(apiSubApp);

module.exports = apiSubApp;
