const express = require('express');
const multer = require('multer');
const path = require('path');

const { PillController } = require('../controllers');

const apiSubApp = express();
const router = new express.Router();
const upload = multer({ dest: path.resolve('./public/uploads') });

router.setup = (app) => {
  app.post('/identipill', upload.single('pill'), PillController.identipill);
};

apiSubApp.use('/', router);
router.setup(apiSubApp);

module.exports = apiSubApp;
