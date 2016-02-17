import auth from '../utils/auth';

function needLogin(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({nextPathname: nextState.location.pathname}, '/login');
  }
}

export const RouteConfig = {
  component: 'div',
  childRoutes: [{
    path: '/',
    indexRoute: {component: require('../containers/Records')},
    component: require('../containers/App'),
    childRoutes: [{
      path: '/login',
      component: require('../containers/Login')
    },{
      path: '/register',
      component: require('../containers/Register')
    },{
      path: '/records(/:type)',
      component: require('../containers/Records')
    }, {
      path: '/projects',
      component: require('../containers/Projects'),
      childRoutes: [{
        path: '/project/:projectId',
        component: require('../containers/Project')
      }]
    }, {
      path: '/templates',
      component: require('../containers/Templates'),
      childRoutes: [{
        path: '/template(/:templateId)',
        component: require('../containers/Template')
      }]
    }, {
      path:'/initapps',
      component: require('../containers/InitApps'),
      childRoutes: [{
        path: '/project_add',
        component: require('../containers/AddProject'),
        onEnter: needLogin
      }]
    }, {
      path: '/analysis',
      component: require('../containers/Analysis')
    }, {
      path: '*',
      component: require('../containers/Records')
    }]
  }]
};
