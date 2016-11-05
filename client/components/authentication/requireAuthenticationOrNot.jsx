import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { flashMessagesActions } from '../../actions';
import { authenticationSelectors } from '../../selectors';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const mapStateToProps = state => ({
  isLoggedIn: authenticationSelectors.isLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  actions: {
    flash: bindActionCreators(flashMessagesActions, dispatch),
  },
});

export default requireAuthentication => WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(
    class RequireAuthenticationOrNot extends Component {
      static displayName = `${requireAuthentication ? 'RequireAuthentication' : 'RequireNoAuthentication'}(${getDisplayName(WrappedComponent)})`
      static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        actions: PropTypes.shape({
          flash: PropTypes.object.isRequired,
        }).isRequired,
      }

      constructor(props) {
        super(props);

        const { actions, isLoggedIn, ...componentProps } = this.props;

        this.actions = actions;
        this.componentProps = componentProps;
        this.isLoggedIn = requireAuthentication ? isLoggedIn : !isLoggedIn;
      }

      componentWillMount() {
        const message = requireAuthentication
          ? 'You must be signed in to view that page!'
          : 'You cannot be signed in to view that page!';

        if (!this.isLoggedIn) {
          this.actions.flash.addMessage({
            severity: 'danger',
            text: message,
          }, /* persistAfterNavigate */ true);
        }
      }

      render() {
        return this.isLoggedIn
          ? <WrappedComponent {...this.componentProps} />
          : <Redirect to="/signin" />;
      }
    }
  );
