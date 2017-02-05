import { CALL_API } from '../middleware/api';
import merge from 'lodash/merge';
import union from 'lodash/union';

// ------------------------------------
// Constants
// ------------------------------------

export const CONTAINERS_REQUEST = 'CONTAINERS_REQUEST';
export const CONTAINERS_FAILURE = 'CONTAINERS_FAILURE';
export const CONTAINERS_SUCCESS = 'CONTAINERS_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

const fetchContainers = () => ({
  [CALL_API]: {
    types: [ CONTAINERS_REQUEST, CONTAINERS_SUCCESS, CONTAINERS_FAILURE ],
    endpoint: 'lxc/containers'
  }
});

export const loadContainers = () => dispatch => dispatch(fetchContainers());

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [CONTAINERS_REQUEST]: state => Object.assign({}, state, { isFetching: true }),
  [CONTAINERS_FAILURE]: state => Object.assign({}, state, { isFetching: false }),
  [CONTAINERS_SUCCESS]: (state, action) => merge({}, state, {
    isFetching: false,
    ids: union(state.ids, action.response.result.containers)
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  ids: []
};
export default function hostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
