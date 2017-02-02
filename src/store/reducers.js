import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import locationReducer from './location';
import authReducer from './auth';
import notificationReducer from './notification';
import usersReducer from './users';
import hostReducer from './host';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth: authReducer,
    form: formReducer,
    host: hostReducer,
    entities: combineReducers({
      users: usersReducer
    }),
    notification: notificationReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
