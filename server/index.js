if (process.env.NODE_ENV === 'development') {
  require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies, global-require
}

const express = require('express');

const addMiddleware = require('./middleware');
const { logSuccess } = require('../tools/chalkLogging');

const app = express();
const port = process.env.PORT || 3000;

addMiddleware(app);

const server = app.listen(port, () => {
  logSuccess(`App started on port ${port}`);
});

module.exports = server;
