import {REQUEST_PROJECTS, REQUEST_PROJECT, SEARCH_START, SEARCH_END} from '../constants/ActionTypes';

export default function projects(state = {
  projects: [],
  project: {},
  result: {},
  isFetching: false
}, action) {
  switch (action.type) {
  case REQUEST_PROJECTS:
    return Object.assign({}, state, {
      projects: action.projects
    });
  case REQUEST_PROJECT:
    return Object.assign({}, state, {
      project: action.project
    });
  case SEARCH_START:
    return Object.assign({}, state, {
      isFetching: action.isFetching,
      result: {}
    });
  case SEARCH_END:
    return Object.assign({}, state, {
      isFetching: action.isFetching,
      result: action.result
    });
  default:
    return state;
  }
}
