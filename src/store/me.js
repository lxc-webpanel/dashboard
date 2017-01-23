import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import { CALL_API, Schemas } from '../middleware/api';

// ------------------------------------
// Constants
// ------------------------------------
export const ME_REQUEST = 'ME_REQUEST';
export const ME_FAILURE = 'ME_FAILURE';
export const ME_SUCCESS = 'ME_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
const fetchMe = () => ({
  [CALL_API]: {
    types: [ ME_REQUEST, ME_SUCCESS, ME_FAILURE ],
    endpoint: 'lwp/me',
    schema: Schemas.USER
  }
})

export const loadMe = () => dispatch => dispatch(fetchMe());

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ME_SUCCESS]: (state, action) => {
    const { data } = action.response;

    return Object.assign({}, state, {
      containers: data.containers,
      email: data.email,
      groups: data.groups,
      name: data.name,
      id: data.id
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  containers: [],
  email: null,
  groups: [],
  name: null,
  id: null
};
export default function meReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
