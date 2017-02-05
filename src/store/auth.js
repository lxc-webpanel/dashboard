require('es6-promise').polyfill();
import { browserHistory } from 'react-router';
import { CALL_API } from '../middleware/api';
import { decode as jwtDecode } from 'jsonwebtoken';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchAuthToken = (username, password) => ({
  [CALL_API]: {
    types: [ LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ],
    endpoint: 'auth',
    method: 'POST',
    body: {
      username,
      password
    }
  },
  effect: ({ state, type }) => {
    // Redirects user on success
    if (type === LOGIN_USER_SUCCESS) {
      browserHistory.push(state.location.query.redirect || '/');
    }
  }
});

export const logUserInWithToken = (token, identity = null) => ({
  type: LOGIN_USER_SUCCESS,
  response: {
    access_token: token,
    identity
  }
});

export const logUserOut = () => ({ type: LOGOUT_USER });

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const logUserIn = (username, password) => dispatch => dispatch(fetchAuthToken(username, password));

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_USER_REQUEST]: state => Object.assign({}, state, { isAuthenticating: true }),
  [LOGIN_USER_SUCCESS]: (state, action) => {
    const { access_token } = action.response;
    let { identity } = action.response;

    if (!identity) {
      identity = jwtDecode(access_token).identity;
    }

    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: access_token,
      identity
    });
  },
  [LOGIN_USER_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null
    });
  },
  [LOGOUT_USER]: (state, action) => {
    return Object.assign({}, state, {
      isAuthenticated: false,
      token: null
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: null,
  identity: null,
  isAuthenticated: false,
  isAuthenticating: false
};
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
