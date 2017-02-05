import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import locationReducer from './location';
import authReducer from './auth';
import notificationReducer from './notification';
import usersReducer from './users';
import hostReducer from './host';
import containersReducer from './containers';
import merge from 'lodash/merge';

const entities = (state = { host: {}, users: {}, containers: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    auth: authReducer,
    containers: containersReducer,
    entities,
    form: formReducer,
    host: hostReducer,
    location: locationReducer,
    notification: notificationReducer,
    users: usersReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
