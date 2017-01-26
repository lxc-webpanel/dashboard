import LoginRoute from 'routes/Auth/Login';

describe('(Route) Auth - Login', () => {
  let _route;

  beforeEach(() => {
    _route = LoginRoute({});
  });

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object');
  });

  it('Configuration should contain `onEnter` function', () => {
    expect(typeof _route.onEnter).to.equal('function');
  });
});
