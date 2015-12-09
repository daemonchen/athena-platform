import fetchData from '../utils/fetchData';
import {REQUEST_PROJECTS, REQUEST_PROJECT, SEARCH_START, SEARCH_END} from '../constants/ActionTypes';
/**
 * 获取所有项目
 */
function projects(projects) {
  return {
    type: REQUEST_PROJECTS,
    projects: projects
  };
}

export function requestProjects() {
  return dispatch => {
    fetchData(dispatch, '/apps', function(json) {
      dispatch(projects(json.data));
    });
  };
}

/**
 * 获取项目详细信息
 */
function project(project) {
  return {
    type: REQUEST_PROJECT,
    project: project
  };
}

export function requestProject(appid) {
  return dispatch => {
    fetchData(dispatch, '/app/desc?appid=' + appid, function(json) {
      dispatch(project(json.data));
    });
  }
}

/**
 * 搜索项目资源
 */
function searchStart() {
  return {
    type: SEARCH_START,
    isFetching: true
  };
}

function searchEnd(result) {
  return {
    type: SEARCH_END,
    result: result,
    isFetching: false
  };
}

export function requestSearch(appid, value) {
  return dispatch => {
    dispatch(searchStart());
    fetchData(dispatch, '/app/search?appid=' + appid + '&search=' + encodeURIComponent(value), function(json) {
      dispatch(searchEnd(json.data));
    });
  }
}

