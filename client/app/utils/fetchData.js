import fetch from 'isomorphic-fetch';
import {REQUEST_URI} from '../constants/Config';
import {ERROR_MESSAGE} from '../constants/ActionTypes';

let toString = Object.prototype.toString;
function type(obj) {
  let type = toString.call(obj);

  switch (type) {
  case '[object Object]':
    return 'object';
  case '[object Function]':
    return 'function';
  }
}

export default function fetchData(dispatch, uri, httpHeaders, successCallback) {
  let callback = type(httpHeaders) === 'function' ? httpHeaders : successCallback;
  let headers = type(httpHeaders) === 'object' ? httpHeaders : null;

  fetch(REQUEST_URI + uri, headers).then(response => response.json()).then(json => {
    if (json.rn !== 0) {
      dispatch({
        type: ERROR_MESSAGE,
        error: json.msg
      });
    } else {
      callback && callback(json);
    }
  }).catch(err => {
    dispatch({
      type: ERROR_MESSAGE,
      error: err
    });
  });
}
