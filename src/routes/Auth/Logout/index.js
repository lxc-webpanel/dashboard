import { logoutUser } from '../../../store/auth';

export default (store) => ({
  path : 'logout',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
      // Webpack - use 'require.ensure' to create a split point
      //   and embed an async module loader (jsonp) when bundling
    require.ensure([], (require) => {
      /*  Return getComponent   */
      cb(null, require('./containers/LogoutContainer').default);

    /* Webpack named bundle   */
    }, 'logout');
  }
});
