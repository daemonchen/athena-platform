import {ADD_PROJECT, REQUEST_APPS} from '../constants/ActionTypes';
import fetchData from '../utils/fetchData';

/**
 * 添加项目
 */
function addProject(redirect) {
  return {
    type: ADD_PROJECT,
    redirect
  };
}

export function requestAddPrject(params, redirect) {
  return dispatch => {
    fetchData(dispatch, '/initApp/add', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }, function(json) {
      dispatch(addProject(redirect));
    });
  };
}

/**
 * 获取项目
 */
function apps(apps) {
  return {
    type: REQUEST_APPS,
    apps: apps
  };
}

export function requestAllApps() {
  return dispatch => {
    fetchData(dispatch, '/initApps', function(json) {
      dispatch(apps(json.data));
    });
  }
}
