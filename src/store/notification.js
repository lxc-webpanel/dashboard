// ------------------------------------
// Constants
// ------------------------------------
export const NOTIF_SEND = 'NOTIF_SEND';
export const NOTIF_SHOW = 'NOTIF_SHOW';
export const NOTIF_HIDE = 'NOTIF_HIDE';
// export const NOTIF_CLEAR = 'NOTIF_CLEAR';

// ------------------------------------
// Actions
// ------------------------------------

export const sendNotif = (payload) => ({ type: NOTIF_SEND, payload });
export const showNotif = () => ({ type: NOTIF_SHOW });
export const hideNotif = () => ({ type: NOTIF_HIDE });
// export const clearNotif = () => ({ type: NOTIF_CLEAR });

export const notify = (message, autoHideDuration = 4000) => dispatch => {
  dispatch(sendNotif({ message }));
  dispatch(showNotif());

  setTimeout(() => {
    dispatch(hideNotif());
  }, autoHideDuration);
};

export const actions = {
  notify
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NOTIF_SEND] : (state, action) => {
    return Object.assign({}, state, {
      message: action.payload.message
    });
  },
  [NOTIF_SHOW] : (state, action) => {
    return Object.assign({}, state, {
      open: true
    });
  },
  [NOTIF_HIDE] : (state, action) => {
    return Object.assign({}, state, {
      open: false
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { message: '', open: false };
export default function notificationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
