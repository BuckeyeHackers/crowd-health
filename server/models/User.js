const bcrypt = require('bcrypt');

const { qrm, query } = require('../../tools/database');
const { userSQL } = require('./sqlProvider');
const Model = require('./Model');
const Token = require('./Token');

const passwordValidation = (errors, password) => {
  if (password.length < 8) {
    Model.pushToArray(errors, 'password',
      'Password must be greater than or equal to 8 characters.');
  }
};

const usernameValidation = (errors, username) => {
  const regex = new RegExp('^[a-zA-Z0-9]+$');

  if (!regex.test(username)) {
    Model.pushToArray(errors, 'username', 'Username can only contain letters or numbers.');
  }

  if (username.length < 2) {
    Model.pushToArray(errors, 'username',
      'Username must be greater than or equal to 2 characters.');
  }
};

class User extends Model {
  static get attributes() {
    return [
      'id',
      'username',
      'firstName',
      'lastName',
      'email',
      'createdAt',
      'updatedAt',
    ];
  }

  static get createAttributes() {
    return {
      required: [
        'username',
        'password',
        'firstName',
        'lastName',
        'email',
      ],
      optional: [],
    };
  }

  static get updateAttributes() {
    return {
      required: [
        'firstName',
        'lastName',
        'email',
      ],
      optional: [],
    };
  }

  static all() {
    return query(userSQL.index, [], qrm.many | qrm.none)
      .then(userDataArray => userDataArray.map(userData => new User(userData)));
  }

  static find(username) {
    return query(userSQL.show, [username], qrm.one | qrm.none)
      .then((data) => {
        if (data === null) {
          return Promise.reject('User does not exist.');
        }

        return new User(data);
      });
  }

  static create(user) {
    const extraValidations = {
      password: passwordValidation,
      username: usernameValidation,
    };

    return super.createValidations(user, extraValidations)
      .then((validUser) => {
        const hashedPassword = bcrypt.hashSync(validUser.password, 10);

        const values = [
          validUser.username,
          hashedPassword,
          validUser.firstName,
          validUser.lastName,
          validUser.email,
        ];

        return query(userSQL.create, values, qrm.one).then(data => new User(data));
      });
  }

  static update(username, user) {
    return super.updateValidations(user)
      .then((validUser) => {
        const values = [
          validUser.firstName,
          validUser.lastName,
          validUser.email,
          username,
        ];

        return query(userSQL.update, values, qrm.one | qrm.none).then((data) => {
          // if null, there isn't an user with that username
          if (data === null) {
            return Promise.reject('User does not exist.');
          }

          return new User(data);
        });
      });
  }

  static destroy(username) {
    return query(userSQL.destroy, [username], qrm.none);
  }

  static login(username, password) {
    return query(userSQL.login, [username], qrm.one | qrm.none).then((data) => {
      if (data !== null && bcrypt.compareSync(password, data.password)) {
        return Token.createForUser(new User(data));
      }

      return Promise.reject('Incorrect username or password.');
    });
  }

  static emailExists(email) {
    return query(userSQL.emailExists, [email], qrm.one)
      .then(data => ({ result: data.result }));
  }

  static usernameExists(username) {
    return query(userSQL.usernameExists, [username], qrm.one)
      .then(data => ({ result: data.result }));
  }
}

module.exports = {
  User,
  passwordValidation,
  usernameValidation,
};
