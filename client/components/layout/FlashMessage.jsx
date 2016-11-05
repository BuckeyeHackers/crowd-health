import React, { PropTypes } from 'react';

const FlashMessage = ({ message }) => (
  <div className={`FlashMessage-container FlashMessage-${message.severity}`}>
    <div className="FlashMessage-text">{message.text}</div>
  </div>
);

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default FlashMessage;
