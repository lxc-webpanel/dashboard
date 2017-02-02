import Auth from './containers/AuthContainer';

// Sync route definition
export default (store) => ({
  component : Auth,
  onEnter: (nextState, replace) => {
    if (store.getState().auth.isAuthenticated === true) {
      replace('/');
    }
  }
});
