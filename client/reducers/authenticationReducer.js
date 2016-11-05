import { authenticationTypes } from '../actions/types';
import initialState from './initialState';

export default (state = initialState.authentication, action) => {
  switch (action.type) {
    case authenticationTypes.SIGN_IN:
      localStorage.token = action.token;
      return {
        ...state,
        token: action.token,
      };
    case authenticationTypes.SIGN_OUT:
      localStorage.token = '';
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};
