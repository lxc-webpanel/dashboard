import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../store/auth';

export default store => next => action => {
  if (action.type === LOGIN_USER_SUCCESS) {
    window.localStorage.setItem('token', action.response.access_token);
  } else if (action.type === LOGIN_USER_FAILURE || action.type === LOGOUT_USER) {
    window.localStorage.removeItem('token');
  }

  next(action);
};
