const jwt = require('jsonwebtoken');

const { qrm, query } = require('../../tools/database');
const { tokenSQL } = require('./sqlProvider');
const Model = require('./Model');

module.exports = class Token extends Model {
  constructor(token) {
    super({});

    this.token = token;
  }

  toJSON() {
    return this.token;
  }

  static get attributes() {
    return [
      'id',
      'userUsername',
      'expiresAt',
      'lastAccessedAt',
    ];
  }

  static get createAttributes() {
    return {
      required: [
        'userUsername',
        'expiresAt',
      ],
      optional: [],
    };
  }

  static createForUser(user) {
    const tokenParams = {
      userUsername: user.username,
      expiresAt: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
    };

    return super.createValidations(tokenParams).then((validTokenParams) => {
      const values = [
        validTokenParams.userUsername,
        validTokenParams.expiresAt,
      ];

      return query(tokenSQL.create, values, qrm.one).then((data) => {
        const token = jwt.sign({
          jti: data.id,
          exp: parseInt(data.expiresAt, 10),
          sub: data.userUsername,
        }, process.env.secret || 'secret');

        return new Token(token);
      });
    });
  }

  static determineValidity(token) {
    const values = [
      token.jti,
    ];

    return query(tokenSQL.deleteOrUpdate, values, qrm.one).then((data) => {
      if (data.result === 0) { // everything is good
        return true;
      } else if (data.result === 1) { // token was deleted
        return Promise.reject('You have been signed out for inactivity. Please sign in again.');
      } else if (data.result === 2) { // token wasn't in database
        return Promise.reject('There was an issue verifying your token. Try signing in again.');
      }

      return Promise.reject('There was an issue verifying your token. Try signing in again.');
    });
  }
};
