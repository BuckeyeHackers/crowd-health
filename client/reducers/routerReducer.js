import { routerTypes } from '../actions/types';
import initialState from './initialState';

export default (state = initialState.router, action) => {
  switch (action.type) {
    case routerTypes.NAVIGATE:
      return {
        ...state,
        location: action.location,
        action: action.action,
      };
    default:
      return state;
  }
};
