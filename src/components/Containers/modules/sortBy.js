// ------------------------------------
// Constants
// ------------------------------------
export const SORT_BY_ID = 'SORT_BY_ID';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_STATE = 'SORT_BY_STATE';

export const SET_SORT_BY = 'SET_SORT_BY';

// ------------------------------------
// Actions
// ------------------------------------
export const setSortBy = by => ({
  type: 'SET_SORT_BY',
  by
});

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SORT_BY]: (state, action) => action.by
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function sortByReducer (state = SORT_BY_STATE, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
