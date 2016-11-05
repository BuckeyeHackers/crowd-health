import { flashMessagesTypes } from './types';

const addMessage = (message, persistThroughNavigate = false) => ({
  type: flashMessagesTypes.ADD_MESSAGE,
  persistThroughNavigate,
  message,
});

const addMessages = (messages, persistThroughClick = false) => ({
  type: flashMessagesTypes.ADD_MESSAGES,
  persistThroughClick,
  messages,
});

const clearMessages = () => ({
  type: flashMessagesTypes.CLEAR_MESSAGES,
});

export default {
  addMessage,
  addMessages,
  clearMessages,
};
