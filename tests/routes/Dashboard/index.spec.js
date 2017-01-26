import DashboardRoute from 'routes/Dashboard';

describe('(Route) Dashboard', () => {
  let _component;

  beforeEach(() => {
    _component = DashboardRoute.component();
  });

  it('Should return a route configuration object', () => {
    expect(typeof DashboardRoute).to.equal('object');
  });

  it('Should define a route component', () => {
    expect(_component.type).to.equal('div');
  });
});
