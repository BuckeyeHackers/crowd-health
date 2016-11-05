const Controller = require('./Controller');
const { User } = require('../models');

module.exports = class UsersController extends Controller {
  static index(req, res) {
    User.all()
      .then((usersArray) => {
        res.status(200).json(super.dataJSON(usersArray));
      })
      .catch((error) => {
        res.status(403).json(super.errorJSON(403, error));
      });
  }

  static show(req, res) {
    User.find(req.params.username)
      .then((user) => {
        res.status(200).json(super.dataJSON(user));
      })
      .catch((error) => {
        res.status(404).json(super.errorJSON(404, error));
      });
  }

  static create(req, res) {
    User.create(req.body.user)
      .then((user) => {
        res.status(201).json(super.dataJSON(user));
      })
      .catch((error) => {
        res.status(403).json(super.errorJSON(403, error));
      });
  }

  static update(req, res) {
    User.update(req.params.username, req.body.user)
      .then((user) => {
        res.status(200).json(super.dataJSON(user));
      })
      .catch((error) => {
        res.status(403).json(super.errorJSON(403, error));
      });
  }

  static destroy(req, res) {
    User.destroy(req.params.username)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((error) => {
        res.status(403).json(super.errorJSON(403, error));
      });
  }

  static login(req, res) {
    User.login(req.body.username, req.body.password)
      .then((token) => {
        res.status(200).json(super.dataJSON({ token }));
      })
      .catch((error) => {
        res.status(404).json(super.errorJSON(404, error));
      });
  }

  static emailExists(req, res) {
    User.emailExists(req.body.email)
      .then((exists) => {
        res.status(200).json(super.dataJSON(exists));
      })
      .catch((error) => {
        res.status(403).json(super.errorJSON(403, error));
      });
  }

  static usernameExists(req, res) {
    User.usernameExists(req.body.username)
      .then((exists) => {
        res.status(200).json(super.dataJSON(exists));
      })
      .catch((error) => {
        res.status(403).json(super.errorJSON(403, error));
      });
  }
};
