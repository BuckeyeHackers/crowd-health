import { authenticationTypes } from './types';

const signIn = ({ token }) => ({
  type: authenticationTypes.SIGN_IN,
  token,
});

const signOut = () => ({
  type: authenticationTypes.SIGN_OUT,
});

export default {
  signIn,
  signOut,
};
