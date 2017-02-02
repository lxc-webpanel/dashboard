import { CALL_API } from '../middleware/api';
import merge from 'lodash/merge';

// ------------------------------------
// Constants
// ------------------------------------

export const HOST_REQUEST = 'HOST_REQUEST';
export const HOST_FAILURE = 'HOST_FAILURE';
export const HOST_SUCCESS = 'HOST_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

const fetchHost = () => ({
  [CALL_API]: {
    types: [ HOST_REQUEST, HOST_SUCCESS, HOST_FAILURE ],
    endpoint: 'lwp/host'
  }
});

export const loadHost = () => dispatch => dispatch(fetchHost());

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [HOST_REQUEST]: state => Object.assign({}, state, { isFetching: true }),
  [HOST_FAILURE]: state => Object.assign({}, state, { isFetching: false }),
  [HOST_SUCCESS]: (state, action) => {
    const host = action.response.entities.host[1];

    return merge({}, state, { ...host, isFetching: false });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: true,
  cpu: {},
  memory: {},
  disk_usage: {},
  uptime: {}
};
export default function hostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
