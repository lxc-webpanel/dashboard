import { UserAuthWrapper } from 'redux-auth-wrapper';
import { browserHistory } from 'react-router';
import { loginUserSuccess } from '../store/auth';

export const requireAuth = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated === true,
  wrapperDisplayName: 'requireAuth', // a nice name for this auth check
  failureRedirectPath: '/auth',
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc);
  }
});

export const logUserIn = store => {
  // TODO: check token expiration date!
  // TODO: redirect to /dashboard ?
  const token = window.localStorage.getItem('token');
  if (token !== null) {
    store.dispatch(loginUserSuccess(token));
  }
};
