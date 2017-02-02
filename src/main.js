import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

import injectTapEventPlugin from 'react-tap-event-plugin';
import queryString from 'query-string';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// ========================================================
// Store Instantiation
// ========================================================
// const initialState = window.___INITIAL_STATE__;
const initialState = Object.assign({}, window.___INITIAL_STATE__, {
  location: {
    hash: window.location.hash,
    pathname: window.location.pathname,
    search: window.location.search,
    query: queryString.parse(window.location.search),
    key: null
  }
});
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./routes/index').default(store);

  // Log user in on landing
  require('./utils/auth').logUserIn(store);

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  );
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
