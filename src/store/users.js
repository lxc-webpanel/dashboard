import { CALL_API } from '../middleware/api';
import merge from 'lodash/merge';

// ------------------------------------
// Constants
// ------------------------------------
export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_FAILURE = 'USERS_FAILURE';
export const USERS_SUCCESS = 'USERS_SUCCESS';

export const ME_REQUEST = 'ME_REQUEST';
export const ME_FAILURE = 'ME_FAILURE';
export const ME_SUCCESS = 'ME_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

const fetchMe = () => ({
  [CALL_API]: {
    types: [ ME_REQUEST, ME_SUCCESS, ME_FAILURE ],
    endpoint: 'lwp/me'
  }
});

const fetchUsers = () => ({
  [CALL_API]: {
    types: [ USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE ],
    endpoint: 'lwp/users'
  }
});

export const loadUsers = () => dispatch => dispatch(fetchUsers());
export const loadMe = () => dispatch => dispatch(fetchMe());

// ------------------------------------
// Action Handlers
// ------------------------------------
const updateIsFetching = (state, bool) => Object.assign({}, state, { isFetching: bool });

const ACTION_HANDLERS = {
  [ME_REQUEST]: state => updateIsFetching(state, true),
  [USERS_REQUEST]: state => updateIsFetching(state, true),
  [ME_FAILURE]: state => updateIsFetching(state, false),
  [USERS_FAILURE]: state => updateIsFetching(state, false),
  [ME_SUCCESS]: (state, action) => {
    const { users } = action.response.entities;

    return merge({}, state, users, { isFetching: false });
  },
  [USERS_SUCCESS]: (state, action) => {
    const { users } = action.response.entities;

    return merge({}, state, users, { isFetching: false });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: true
};
export default function usersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
