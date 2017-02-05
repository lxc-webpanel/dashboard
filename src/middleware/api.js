require('es6-promise').polyfill();
import normalize from 'jsonapi-normalizer';
import { logUserOut } from '../store/auth';

// const API_ROOT = 'http://localhost:5000/';
export const API_ROOT = __API_ROOT__;

const formatAPIResponse = (data, endpoint) => {
  let formattedResponse;

  if (endpoint === 'lwp/me') {
    const d = data.data;

    formattedResponse = Object.assign({}, {
      data: {
        type: 'users',
        id: d.id,
        attributes: {
          email: d.email,
          name: d.name,
          password: d.password
        },
        relationships: {
          groups: {
            data: d.groups.map(group => ({ type: 'groups', id: group }))
          }
        }
      }
    });
  }

  if (endpoint === 'lwp/host') {
    const d = data.data;

    formattedResponse = Object.assign({}, {
      data: {
        type: 'host',
        id: 1,
        attributes: {
          cpu: {
            cores: d.cpu.cores,
            model: d.cpu.model,
            usage: d.cpu.usage
          },
          disk: {
            disk: d.disk.disk,
            free: d.disk.free,
            percent: d.disk.percent,
            total: d.disk.total,
            used: d.disk.used
          },
          dist: d.dist,
          hostname: d.hostname,
          kernel: d.kernel,
          memory: {
            percent: d.memory.percent,
            percent_cached: d.memory.percent_cached,
            swap_percent: d.memory.swap_percent,
            swap_total: d.memory.swap_total,
            swap_used: d.memory.swap_used,
            total: d.memory.total,
            used: d.memory.used
          },
          uptime: {
            days: d.uptime.days,
            hours: d.uptime.hours,
            minutes: d.uptime.minutes,
            seconds: d.uptime.seconds
          }
        }
      }
    });
  }

  if (endpoint === 'lxc/containers') {
    const containers = data.data.map(container => ({
      type: 'containers',
      id: container.id,
      attributes: {
        lxc: {
          arch: container.lxc.arch,
          network: container.lxc.network.map(net => ({
            flags: net.flags,
            hwaddr: net.hwaddr,
            ipv4: net.ipv4,
            ipv6: net.ipv6,
            link: net.link,
            macvlan: net.macvlan,
            mtu: net.mtu,
            name: net.name,
            script: net.script,
            type: net.type,
            veth: net.veth,
            vlan: net.vlan
          }))
        },
        name: container.name,
        pid: container.pid,
        state: container.state
      }
    }));

    formattedResponse = Object.assign({}, {
      data: containers
    });
  }

  return formattedResponse;
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, options) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, options)
    .then((response) =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        if (endpoint === 'auth') {
          return Object.assign({}, json);
        }

        // if (endpoint === 'lxc/containers') {
        //   return Object.assign({}, normalize(json));
        // }

        try {
          const formattedAPIResponse = formatAPIResponse(json, endpoint);

          console.log('formattedAPIResponse', formattedAPIResponse);
          console.log('normalize', normalize(formattedAPIResponse));

          return Object.assign({}, normalize(formattedAPIResponse));
        } catch (e) {
          console.error(e);
        }
      })
    );
};

const formatRequestOptions = (endpoint, method, body = null, token = null) => {
  let options;
  let headers = {
    'Content-Type': 'application/json'
  };

  // Only the 'auth' endpoint is non-protected
  if (endpoint !== 'auth' && token) {
    headers = Object.assign({}, headers, {
      'Authorization': `Bearer ${token}`
    });
  }

  options = {
    headers,
    method
  };

  if (body) {
    options = Object.assign({}, options, {
      body: JSON.stringify(body)
    });
  }

  return options;
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

  let { endpoint } = callAPI;
  const { types, method = 'GET', body = null } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (body && typeof body !== 'object') {
    throw new Error('Expected body to be an object.');
  }
  if (typeof method !== 'string') {
    throw new Error('Specify a string method.');
  } else if (method !== 'POST' && method !== 'GET') {
    throw new Error('Expected method to be "GET" or "POST".');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const options = formatRequestOptions(endpoint, method, body, store.getState().auth.token);

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, options).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => {
      // TODO: dispatch LOGOUT_USER when server returns 401 (must discard token!);
      store.dispatch(logUserOut());

      return next(actionWith({
        type: failureType,
        error: error.description || 'Something bad happened'
      }));
    }
  );
};
