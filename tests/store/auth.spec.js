import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  loginUserSuccess,
  loginUserFailure,
  loginUserRequest,
  logout,
  loginUser,
  logoutUser,
  default as authReducer
} from 'store/auth';

import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('(Internal Module) Auth', () => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false
  };

  const token = 'xxx';
  const username = 'admin';
  const password = 'azerty';

  it('Should export a constant LOGIN_USER_REQUEST.', () => {
    expect(LOGIN_USER_REQUEST).to.equal('LOGIN_USER_REQUEST');
  });

  it('Should export a constant LOGIN_USER_FAILURE.', () => {
    expect(LOGIN_USER_FAILURE).to.equal('LOGIN_USER_FAILURE');
  });

  it('Should export a constant LOGIN_USER_SUCCESS.', () => {
    expect(LOGIN_USER_SUCCESS).to.equal('LOGIN_USER_SUCCESS');
  });

  it('Should export a constant LOGOUT_USER.', () => {
    expect(LOGOUT_USER).to.equal('LOGOUT_USER');
  });

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(authReducer).to.be.a('function');
    });

    it('Should initialize with an initial state.', () => {
      expect(authReducer(undefined, {})).to.eql({
        token: null,
        isAuthenticated: false,
        isAuthenticating: false
      });
    });

    it('Should return the previous state if an action was not matched.', () => {
      let state = authReducer(undefined, {});
      expect(state).to.eql(initialState);
      state = authReducer(state, { type: '@@@@@@@' });
      expect(state).to.eql(initialState);

      const authState = {
        token: 'xxx',
        isAuthenticated: true,
        isAuthenticating: false
      };
      state = authReducer(state, loginUserSuccess('xxx'));
      expect(state).to.eql(authState);
      state = authReducer(state, { type: '@@@@@@@' });
      expect(state).to.eql(authState);
    });

    it('Should handle "LOGIN_USER_REQUEST"', () => {
      let state = authReducer(undefined, {
        type: LOGIN_USER_REQUEST
      });

      expect(state).to.eql({
        token: null,
        isAuthenticated: false,
        isAuthenticating: true
      });
    });

    it('Should handle "LOGIN_USER_SUCCESS"', () => {
      let state = authReducer(undefined, {
        type: LOGIN_USER_SUCCESS,
        payload: {
          token
        }
      });

      expect(state).to.eql({
        token,
        isAuthenticated: true,
        isAuthenticating: false
      });
    });

    it('Should handle "LOGIN_USER_FAILURE"', () => {
      let state = authReducer(undefined, {
        type: LOGIN_USER_FAILURE,
        payload: {
          status: 500
        }
      });

      expect(state).to.eql({
        token: null,
        isAuthenticated: false,
        isAuthenticating: false
      });
    });

    it('Should handle "LOGOUT_USER"', () => {
      let state = authReducer(undefined, {
        type: LOGOUT_USER
      });

      expect(state).to.eql({
        token: null,
        isAuthenticated: false,
        isAuthenticating: false
      });
    });
  });

  describe('(Action Creator) loginUserSuccess', () => {
    const loginUserSuccessAction = loginUserSuccess(token);

    it('Should be exported as a function.', () => {
      expect(loginUserSuccess).to.be.a('function');
    });

    it('Should return an action with type "LOGIN_USER_SUCCESS".', () => {
      expect(loginUserSuccessAction).to.have.property('type', LOGIN_USER_SUCCESS);
    });

    it('Should assign arguments to the "payload" property.', () => {
      expect(loginUserSuccessAction).to.have.property('payload').that.eqls({ token });
    });
  });

  describe('(Action Creator) loginUserFailure', () => {
    const loginUserFailureAction = loginUserFailure({
      response : {
        status: 500
      }
    });

    it('Should be exported as a function.', () => {
      expect(loginUserFailure).to.be.a('function');
    });

    it('Should return an action with type "LOGIN_USER_FAILURE".', () => {
      expect(loginUserFailureAction).to.have.property('type', LOGIN_USER_FAILURE);
    });

    it('Should assign arguments to the "payload" property.', () => {
      expect(loginUserFailureAction).to.have.property('payload').that.eqls({ status: 500 });
    });
  });

  describe('(Action Creator) loginUserRequest', () => {
    const loginUserRequestAction = loginUserRequest(username, password);

    it('Should be exported as a function.', () => {
      expect(loginUserRequest).to.be.a('function');
    });

    it('Should return an action with type "LOGIN_USER_REQUEST".', () => {
      expect(loginUserRequestAction).to.have.property('type', LOGIN_USER_REQUEST);
    });
  });

  describe('(Action Creator) logout', () => {
    it('Should be exported as a function.', () => {
      expect(logout).to.be.a('function');
    });

    it('Should return an action with type "LOGOUT_USER".', () => {
      expect(logout()).to.have.property('type', LOGOUT_USER);
    });
  });

  describe('(Specialized Action Creators)', () => {
    let store;

    beforeEach(() => {
      store = mockStore(initialState);
    });

    describe('(Specialized Action Creator) loginUser', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      it('Should be exported as a function.', () => {
        expect(loginUser).to.be.a('function');
      });

      it('Should return a function (is a thunk).', () => {
        expect(loginUser(username, password)).to.be.a('function');
      });

      it('Should dispatch "LOGIN_USER_SUCCESS" when authentication request has been done', () => {
        const expectedActions = [
          { type: LOGIN_USER_REQUEST },
          { type: LOGIN_USER_SUCCESS, payload: { token } }
        ];

        fetchMock.post(`${__API_ROOT__}auth`, { access_token: token });

        return store.dispatch(loginUser(username, password))
          .then(() => {
            expect(store.getActions()).to.eql(expectedActions);
          });
      });
    });

    describe('(Specialized Action Creator) logoutUser', () => {
      it('Should be exported as a function.', () => {
        expect(logoutUser).to.be.a('function');
      });

      it('Should return a function (is a thunk).', () => {
        expect(logoutUser()).to.be.a('function');
      });

      it('Should dispatch "LOGOUT_USER" when logging out', () => {
        const expectedActions = [
          { type: LOGOUT_USER }
        ];

        store.dispatch(logoutUser());
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });
});
