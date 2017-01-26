import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import apiMiddleware, { CALL_API } from 'middleware/api';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

// - the middleware will ignore actions without a CALL_API key - DONE
// - the middleware will send the server an API call based on action[CALL_API]
// - the middleware will dispatch an action[CALL_API].successType event after a successful request
// - the middleware will resolve the middleware return promise after a successful request

describe('(Middleware) API', () => {
  const fakeNext = sinon.spy();
  const _REQUEST = '_REQUEST';
  const _SUCCESS = '_SUCCESS';
  const _FAILURE = '_FAILURE';

  describe('When action is without "CALL_API"', () => {
    it('Passes the action to next middleware', () => {
      const fakeStore = {};

      const action = { type: '@@@@@@@' };
      apiMiddleware(fakeStore)(fakeNext)(action);
      expect(fakeNext).to.have.been.calledWith(action);
    });
  });

  describe('When action is with "CALL_API"', () => {
    let store;
    const action = {
      [CALL_API]: {
        endpoint: '',
        types: [_REQUEST, _SUCCESS, _FAILURE]
      }
    };

    beforeEach(() => {
      store = mockStore({});
      fakeNext.reset();
    });

    afterEach(() => {
      fetchMock.restore();
    });

    // it('Sends request to path with query and body', () => {
    //   fetchMock.get(endpoint, {
    //     containers: [],
    //     email: 'string',
    //     groups: [],
    //     name: 'string',
    //     password: 'string',
    //     id: 0
    //   });

    //   apiMiddleware(fakeStore)(fakeNext)(action);

    //   // fetchMock.done();
    // });

    // it('resolves returned promise when response when success', () => {

    //   let promise = apiMiddleware(fakeStore({}))(fakeNext)(action);

    //   return expect(promise).to.be.fulfilled;
    // });

    it('Dispatches "_SUCCESS" action type with response when request has been successful', () => {
      fetchMock.get(__API_ROOT__, { test: 'This is a fake body.' });

      const promise = apiMiddleware(store)(fakeNext)(action);

      expect(fakeNext).to.have.been.calledWith({
        type: _REQUEST
      });

      fakeNext.reset();

      return promise.then(() => {
        expect(fakeNext).to.have.been.calledWith({
          type: _SUCCESS,
          response: { test: 'This is a fake body.' }
        });
      });
    });

    // it('dispatch successType with response when success', () => {
    //   fetchMock.get(__API_ROOT__, {
    //     status: 401,
    //     ok: false
    //   });

    //   const promise = apiMiddleware(store)(fakeNext)(action);

    //   expect(fakeNext).to.have.been.calledWith({
    //     type: _REQUEST
    //   });

    //   fakeNext.reset();

    //   return promise.then(() => {
    //     expect(fakeNext).to.have.been.calledWith({
    //       type: _FAILURE,
    //       error: 'Something bad happened'
    //     });
    //   });
    // });
  });
});
