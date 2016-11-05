const jwt = require('jsonwebtoken');

const { Token } = require('../models');
const { logError } = require('../../tools/chalkLogging');

const forbiddenWithErrors = (res, errors) => {
  res.status(403).json({
    status: 403,
    errors: {
      error: errors,
    },
  });
};

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const errors = [];

  if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
    let token;

    try {
      token = jwt.verify(authHeader.split(' ')[1], process.env.secret || 'secret');
    } catch (ex) {
      errors.push('There was an issue verifying your token. Try signing in again.');
      logError(ex);
    }

    if (token !== undefined) {
      Token.determineValidity(token).then(() => {
        next();
      }).catch((invalid) => {
        errors.push(invalid);
        forbiddenWithErrors(res, errors);
      });
    }
  } else {
    errors.push('Missing token.');
  }

  if (errors.length > 0) {
    forbiddenWithErrors(res, errors);
  }
};
