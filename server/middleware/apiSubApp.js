const express = require('express');

const { UsersController } = require('../controllers');
const authenticate = require('./authenticate');

const apiSubApp = express();
const router = new express.Router();

router.setup = (app) => {
  // ------------------
  // UsersController
  // ------------------
  // Authenticated
  app.get('/users', authenticate, UsersController.index);
  app.get('/users/:username', authenticate, UsersController.show);
  app.put('/users/:username', authenticate, UsersController.update);
  app.delete('/users/:username', authenticate, UsersController.destroy);
  // Unauthenticated
  app.post('/users', UsersController.create);
  app.post('/users/login', UsersController.login);
  app.post('/users/emailExists', UsersController.emailExists);
  app.post('/users/usernameExists', UsersController.usernameExists);
};

apiSubApp.use('/', router);
router.setup(apiSubApp);

module.exports = apiSubApp;
