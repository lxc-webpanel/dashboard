// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout';
import AuthLayout from '../layouts/AuthLayout';

import DashboardRoute from './Dashboard';
import CounterRoute from './Counter';
import Login from './Auth/Login';
import LogoutRoute from './Auth/Logout';

import { requireAuth } from '../utils/auth';

export const createRoutes = (store) => ([
  {
    path        : '/',
    component   : requireAuth(CoreLayout),
    indexRoute  : DashboardRoute,
    childRoutes : [
      CounterRoute(store)
    ]
  },
  {
    path        : '/auth',
    component   : AuthLayout,
    indexRoute: Login(store),
    childRoutes : [
      LogoutRoute(store)
    ]
  }
]);

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
