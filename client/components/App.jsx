import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Match, Miss } from 'react-router';
import { ControlledBrowserRouter as Router } from 'react-router-addons-controlled';

import { logError } from '../../tools/chalkLogging';
import { routerActions } from '../actions';
import { FlashMessages, Footer, Header } from './layout';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import SignInPage from './SignInPage';

import { requireAuthentication, requireNoAuthentication } from './authentication';

import './App.scss';

const mapStateToProps = state => ({
  location: state.router.location,
  action: state.router.action,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(routerActions, dispatch),
});

const App = ({ location, action, actions, history }) => (
  <Router
    history={history}
    location={location}
    action={action}
    onChange={
      (newLocation, newAction) => {
        if (newAction === 'SYNC') {
          actions.navigate(location, action);
        } else if (!window.block) {
          actions.navigate(newLocation, newAction);
        } else {
          logError('Blocked!');
        }
      }
    }
  >
    {
      ({ router }) => (
        <div className="App-container">
          <Header router={router} />
          <div className="App-content">
            <FlashMessages />
            <Match exactly pattern="/" component={HomePage} />
            <Match exactly pattern="/authtest" component={requireAuthentication(HomePage)} />
            <Match exactly pattern="/signin" component={requireNoAuthentication(SignInPage)} />
            <Miss component={NotFoundPage} />
          </div>
          <Footer />
        </div>
      )
    }
  </Router>
);

App.propTypes = {
  action: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
