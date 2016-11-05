import { combineReducers } from 'redux';

import initialState, { createInitialState } from './initialState';
import authenticationReducer from './authenticationReducer';
import flashMessagesReducer from './flashMessagesReducer';
import routerReducer from './routerReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  flashMessages: flashMessagesReducer,
  router: routerReducer,
});

export {
  initialState,
  createInitialState,
};

export default rootReducer;
