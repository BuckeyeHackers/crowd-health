const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const apiSubApp = require('./apiSubApp');

const addMiddleware = (app) => {
  const isTest = process.env.NODE_ENV === 'test';

  // logging
  if (!isTest) {
    app.use(morgan('dev'));
  }

  // parse the requests
  app.use(bodyParser.json());

  // mount the api
  app.use('/api', apiSubApp);

  // static files
  app.use(express.static(path.resolve(__dirname, '../../public')));

  app.use('/public/tts/*.wav', (req, res) => {
    res.sendFile(path.resolve(__dirname, `../../${req.originalUrl}`));
  });

  app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
  });

  return app;
};

module.exports = addMiddleware;
