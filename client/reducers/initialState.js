const initialState = {
  authentication: {
    token: localStorage.token,
  },
  flashMessages: {
    persistThroughNavigate: false,
    messages: [],
  },
  router: {
    location: undefined,
    action: undefined,
  },
};

export const createInitialState = history => (
  {
    ...initialState,
    router: {
      ...initialState.router,
      location: history.location,
      action: history.action,
    },
  }
);

export default initialState;
