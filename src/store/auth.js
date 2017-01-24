import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import { checkHttpStatus } from '../utils';
import { notify } from './notification';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';

// ------------------------------------
// Actions
// ------------------------------------
export const loginUserSuccess = (token, redirect = false) => ({
  type: LOGIN_USER_SUCCESS,
  payload: {
    token: token
  }
});

export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: {
    status: error.response.status,
    statusText: error.response.statusText
  }
});

export const loginUserRequest = (username, password) => ({
  type: LOGIN_USER_REQUEST,
  payload: { username, password }
});

export const logout = () => ({ type: LOGOUT_USER });

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const loginUser = (username, password, redirect = '/') => dispatch => {
  dispatch(loginUserRequest());
  dispatch(notify('Logging you in...'));

  return fetch('https://lwp.googley.fr/api/v1/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({ username, password })
  })
  .then(checkHttpStatus)
  .then(response => response.json())
  .then(json => {
    try {
      setTimeout(() => {
        dispatch(loginUserSuccess(json.access_token));
        dispatch(notify('Successfully logged in'));
        browserHistory.push(redirect);
      }, 2000);
    } catch (e) {
      dispatch(loginUserFailure({
        response: {
          status: 403,
          statusText: 'Invalid token'
        }
      }));
    }
  })
  .catch(error => {
    console.error(error);

    dispatch(loginUserFailure({
      response: {
        status: 500,
        statusText: 'Something bad happened! :('
      }
    }));
  });
};

export const logoutUser = (redirect = '/auth') => dispatch => {
  dispatch(logout());
  dispatch(notify('Successfully logged out!'));
  browserHistory.push(redirect);
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_USER_REQUEST]: (state) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': 'Logging you in...'
    });
  },
  [LOGIN_USER_SUCCESS]: (state, action) => {
    const { token } = action.payload;

    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': token,
      'statusText': 'You have been successfully logged in.'
    });
  },
  [LOGIN_USER_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'username': null,
      'statusText': `Authentication Error`
    });
  },
  [LOGOUT_USER]: (state, action) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'username': null,
      'statusText': 'You have been successfully logged out.'
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: null,
  username: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
