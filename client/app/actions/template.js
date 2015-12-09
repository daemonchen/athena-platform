import {REQUEST_TEMPLATES, REQUEST_TEMPLATE, ADD_TEMPLATE, UPDATE_TEMPLATE} from '../constants/ActionTypes';
import fetchData from '../utils/fetchData';

/**
 * 请求添加模板
 */
function addTemplate(redirect) {
  return {
    type: ADD_TEMPLATE,
    redirect: redirect
  };
}

export function requestAddTemplate(params, redirect) {
  return dispatch => {
    fetchData(dispatch, '/template/add', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }, function(json) {
      dispatch(addTemplate(redirect));
    });
  };
}

/**
 * 请求所有模版
 */
function templates(templates) {
  return {
    type: REQUEST_TEMPLATES,
    templates: templates
  };
}

export function requestTemplates() {
  return dispatch => {
    fetchData(dispatch, '/templates', function(json) {
      dispatch(templates(json.data));
    });
  }
}

/**
 * 获取某个模板
 */
function template(template) {
  return {
    type: REQUEST_TEMPLATE,
    template
  };
}

export function requestTemplate(templateId) {
  return dispatch => {
    fetchData(dispatch, '/template/get?templateId=' + templateId, function(json) {
      dispatch(template(json.data));
    });
  }
}

/**
 * 更新模板
 */
function updateTemplate(redirect) {
  return {
    type: UPDATE_TEMPLATE,
    redirect
  };
}

export function requestUpdateTemplate(params, redirect) {
  return dispatch => {
    fetchData(dispatch, '/template/update', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }, function(json) {
      dispatch(addTemplate(redirect));
    });
  };
}
