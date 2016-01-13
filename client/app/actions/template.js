import {REQUEST_TEMPLATES, REQUEST_TEMPLATE, ADD_TEMPLATE, UPDATE_TEMPLATE, TEMPLATE_CONTENT} from '../constants/ActionTypes';
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
      dispatch(addTemplate(redirect + json.data._id));
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

export function requestTemplates(getDefault) {
  return dispatch => {
    fetchData(dispatch, '/templates' + (getDefault ? '?getDefault=true' : ''), function(json) {
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
function updateTemplate(template, content) {
  return {
    type: UPDATE_TEMPLATE,
    template: template,
    content: content
  };
}

export function requestUpdateTemplate(params, cb) {
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
      cb && cb();
      dispatch(updateTemplate(json.data, params.content));
    });
  };
}

/**
 * 获取文件内容
 */
function pageContent(content) {
  return {
    type: TEMPLATE_CONTENT,
    content
  }
}

export function requestGetPageContent(file, templateId) {
  return dispatch => {
    fetchData(dispatch, '/template/getContent?' + (templateId ? 'templateId=' + templateId + '&' : '') + 'file=' + file, function(json) {
      dispatch(pageContent(json.data));
    });
  }
}
