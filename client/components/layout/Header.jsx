import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { authenticationActions } from '../../actions';
import { authenticationSelectors } from '../../selectors';

import './Header.scss';

const mapStateToProps = state => ({
  isLoggedIn: authenticationSelectors.isLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  actions: {
    authentication: bindActionCreators(authenticationActions, dispatch),
  },
});

const SignInLink = ({ actions, isLoggedIn, router }) => {
  if (isLoggedIn) {
    return (
      <button
        className="Header-nav--signout"
        onClick={() => {
          actions.authentication.signOut();
          router.transitionTo('/');
        }}
      >
      Sign Out
      </button>
    );
  }

  return <Link to="/signin" activeClassName="Header-nav--active">Sign In</Link>;
};

SignInLink.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
};

const Header = ({ actions, isLoggedIn, router }) => (
  <header>
    <nav className="Header-nav">
      <Link to="/" activeClassName="Header-nav--active" activeOnlyWhenExact>Home</Link>
      <Link to="/authtest" activeClassName="Header-nav--active">Auth Test</Link>
      <SignInLink actions={actions} isLoggedIn={isLoggedIn} router={router} />
    </nav>
  </header>
);

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
