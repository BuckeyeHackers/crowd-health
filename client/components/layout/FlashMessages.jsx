import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { flashMessagesActions } from '../../actions';
import { flashMessagesSelectors } from '../../selectors';
import FlashMessage from './FlashMessage';

const mapStateToProps = state => ({
  messages: flashMessagesSelectors.messages(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(flashMessagesActions, dispatch),
});

const FlashMessages = ({ messages, actions }) => (
  <div className="FlashMessages-container">
    {
      messages.length > 0
      ? (
        <button onClick={() => actions.clearMessages()} className="FlashMessage-dismiss">
          &times;
        </button>
      )
      : null
    }
    {
      messages.map((message, index) => <FlashMessage key={index} message={message} />) || null
    }
  </div>
);

FlashMessages.propTypes = {
  actions: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessages);
