// React
import React from 'react';
import { createBrowserHistory } from 'history';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { App } from './components';
import { createInitialState } from './reducers';
import configureStore from './store';

// Setup store
const history = createBrowserHistory();
const store = configureStore(createInitialState(history));

// setup redux and HMR
const appRoot = (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

const app = document.getElementById('app');

render(appRoot, app);

if (module.hot) {
  module.hot.accept(() => {
    render(
      <AppContainer>
        {appRoot}
      </AppContainer>,
      app
    );
  });
}
