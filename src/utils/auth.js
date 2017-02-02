import { UserAuthWrapper } from 'redux-auth-wrapper';
import { browserHistory } from 'react-router';
import { logUserInWithToken } from '../store/auth';
import { decode as jwtDecode } from 'jsonwebtoken';

export const requireAuth = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated === true,
  wrapperDisplayName: 'requireAuth', // a nice name for this auth check
  failureRedirectPath: '/auth',
  redirectAction: newLoc => dispatch => {
    console.log('⛔️ Access denied! -> Redirected!');
    browserHistory.replace(newLoc);
  }
});

export const logUserIn = store => {
  const token = window.localStorage.getItem('token');

  if (token !== null) {
    try {
      const { exp, identity } = jwtDecode(token);
      const now = Date.now() / 1000;

      // Log user in if token is still valid
      if (exp > now) {
        store.dispatch(logUserInWithToken(token, identity));
      }
    } catch (e) {
      console.error(e);
    }
  }
};
