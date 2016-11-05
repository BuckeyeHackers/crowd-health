import decode from 'jwt-decode';

const token = (state) => {
  if (state.authentication.token && state.authentication.token !== '') {
    return decode(state.authentication.token);
  }

  return undefined;
};

const isLoggedIn = state => !!token(state);

export default {
  isLoggedIn,
  token,
};
