const Controller = require('./Controller');
const { Pill } = require('../models');

module.exports = class PillsController extends Controller {
  static identipill(req, res) {
    Pill.identipill(req.body.pill)
      .then((identifiedPill) => {
        res.status(200).json(super.dataJSON(identifiedPill));
      })
      .catch((error) => {
        res.status(403).json(super.errorJSON(403, error));
      });
  }
};
