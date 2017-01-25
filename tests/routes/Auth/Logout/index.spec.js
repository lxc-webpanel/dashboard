import LogoutRoute from 'routes/Auth/Logout';

describe('(Route) Auth - Logout', () => {
  let _route;

  beforeEach(() => {
    _route = LogoutRoute({});
  });

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object');
  });

  it('Configuration should contain path `logout`', () => {
    expect(_route.path).to.equal('logout');
  });
});
