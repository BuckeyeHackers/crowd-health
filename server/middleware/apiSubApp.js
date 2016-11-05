const crypto = require('crypto');
const express = require('express');
const multer = require('multer');
const path = require('path');

const { PillController } = require('../controllers');

const apiSubApp = express();
const router = new express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  },
});
const upload = multer({ storage });


router.setup = (app) => {
  app.post('/identipill', upload.single('pill'), PillController.identipill);
};

apiSubApp.use('/', router);
router.setup(apiSubApp);

module.exports = apiSubApp;
