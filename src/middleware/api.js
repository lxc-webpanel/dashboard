import { normalize, schema } from 'normalizr';
// import { camelizeKeys } from 'humps';
import fetch from 'isomorphic-fetch';

import { browserHistory } from 'react-router';


// const API_ROOT = 'http://localhost:5000/';
export const API_ROOT = 'https://lwp.googley.fr/api/v1/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, schema = null, options = {}) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, options)
    .then((response) =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        console.info('json', json);

        // const camelizedJson = camelizeKeys(json);
        // const nextPageUrl = getNextPageUrl(response);

        // return Object.assign({},
        //   normalize(camelizedJson, schema),
        //   { nextPageUrl }
        // );

        return Object.assign({},
          json,
          {  }
        );
      })
    );
};

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const userSchema = new schema.Entity('users', {
  containers: containerSchema,
  groups: groupSchema
});

const containerSchema = new schema.Entity('containers');

const groupSchema = new schema.Entity('groups');

// Schemas for API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  CONTAINER: containerSchema,
  CONTAINER_ARRAY: [containerSchema],
  GROUP: groupSchema,
  GROUP_ARRAY: [groupSchema]
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, options } = callAPI;
  const { schema, types } = callAPI;

  // Add JWT token to each request
  const token = store.getState().auth.token;

  options = Object.assign({}, options, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.');
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema, options).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
