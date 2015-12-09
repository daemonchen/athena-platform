import {REQUEST_APPS} from '../constants/ActionTypes';

export default function initApps(state = {
  apps: []
}, action) {
  switch (action.type) {
  case REQUEST_APPS:
    return Object.assign({}, state, {
      apps: action.apps
    });
  default:
    return state;
  }
}
