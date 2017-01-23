import Login from './containers/LoginContainer';

// Sync route definition
export default (store) => ({
  component : Login,
  onEnter: (nextState, replace) => {
    if (store.getState().auth.isAuthenticated === true) {
      replace('/');
    }
  }
});
