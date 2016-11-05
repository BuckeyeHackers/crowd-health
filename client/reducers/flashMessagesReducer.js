import { flashMessagesTypes, routerTypes } from '../actions/types';
import initialState from './initialState';

export default (state = initialState.flashMessages, action) => {
  switch (action.type) {
    case routerTypes.NAVIGATE:
      if (state.persistThroughNavigate) {
        return {
          ...state,
          persistThroughNavigate: false,
        };
      }

      return {
        ...state,
        messages: [],
      };
    case flashMessagesTypes.ADD_MESSAGE:
      return {
        ...state,
        persistThroughNavigate: action.persistThroughNavigate,
        messages: [action.message],
      };
    case flashMessagesTypes.ADD_MESSAGES:
      return {
        ...state,
        persistThroughNavigate: action.persistThroughNavigate,
        messages: action.messages,
      };
    case flashMessagesTypes.CLEAR_MESSAGES:
      return initialState.flashMessages;
    default:
      return state;
  }
};
