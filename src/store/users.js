import { CALL_API } from '../middleware/api';
import merge from 'lodash/merge';
import union from 'lodash/union';

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

const ACTION_HANDLERS = {
  [ME_REQUEST]: state => Object.assign({}, state, { isFetching: true }),
  [USERS_REQUEST]: state => Object.assign({}, state, { isFetching: true }),

  [ME_FAILURE]: state => Object.assign({}, state, { isFetching: false }),
  [USERS_FAILURE]: state => Object.assign({}, state, { isFetching: false }),

  [ME_SUCCESS]: state => merge({}, state, { isFetching: false }),
  [USERS_SUCCESS]: (state, action) => merge({}, state, {
    isFetching: false,
    ids: union(state.ids, action.response.result.users)
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  ids: []
};
export default function usersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
