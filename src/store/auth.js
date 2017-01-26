require('es6-promise').polyfill();
import { browserHistory } from 'react-router';
import { checkHttpStatus } from '../utils';
// import { notify } from './notification';

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
export const loginUserSuccess = token => ({
  type: LOGIN_USER_SUCCESS,
  payload: {
    token
  }
});

export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: {
    status: error.response.status
  }
});

export const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
export const logout = () => ({ type: LOGOUT_USER });

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const loginUser = (username, password, redirect = '/') => dispatch => {
  dispatch(loginUserRequest());
  // dispatch(notify('Logging you in...'));

  return fetch(`${__API_ROOT__}auth`, {
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
      dispatch(loginUserSuccess(json.access_token));
      browserHistory.push(redirect);
      // dispatch(notify('Successfully logged in'));
    } catch (e) {
      return dispatch(loginUserFailure({
        response: {
          status: 403,
          statusText: 'Invalid token'
        }
      }));
    }
  })
  .catch(error => {
    console.log('ERROR', JSON.stringify(error, null, 4));

    return dispatch(loginUserFailure({
      response: {
        status: 500,
        statusText: 'Something bad happened! :('
      }
    }));
  });
};

export const logoutUser = (redirect = '/auth') => dispatch => {
  dispatch(logout());
  browserHistory.push(redirect);
  // dispatch(notify('Successfully logged out!'));
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_USER_REQUEST]: (state) => {
    return Object.assign({}, state, {
      'isAuthenticating': true
    });
  },
  [LOGIN_USER_SUCCESS]: (state, action) => {
    const { token } = action.payload;

    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      token
    });
  },
  [LOGIN_USER_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null
    });
  },
  [LOGOUT_USER]: (state, action) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false
};
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
