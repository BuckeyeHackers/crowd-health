import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authenticationActions, flashMessagesActions } from '../actions';
import { api, pushToArray } from '../tools';

import './SignInPage.scss';

const passwordValidation = (errors, password) => {
  if (password.length < 8) {
    pushToArray(errors, 'password',
      'Password must be greater than or equal to 8 characters.');
  }
};

const usernameValidation = (errors, username) => {
  const regex = new RegExp('^[a-zA-Z0-9]+$');

  if (!regex.test(username)) {
    pushToArray(errors, 'username', 'Username can only contain letters or numbers.');
  }

  if (username.length < 2) {
    pushToArray(errors, 'username',
      'Username must be greater than or equal to 2 characters.');
  }
};

const mapDispatchToProps = dispatch => ({
  actions: {
    authentication: bindActionCreators(authenticationActions, dispatch),
    flash: bindActionCreators(flashMessagesActions, dispatch),
  },
});

const SignInPage = ({ actions }) => (
  <div>
    <h1>Sign in</h1>
  </div>
);

export default connect(null, mapDispatchToProps)(SignInPage);
