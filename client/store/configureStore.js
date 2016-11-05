import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middeware = [
    thunkMiddleware,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middeware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
