import fetchData from '../utils/fetchData';
import {LOGIN, REGISTER} from '../constants/ActionTypes';
import md5 from 'md5';

/**
 * 用户注册
 */
function register(redirect) {
  return {
    type: REGISTER,
    redirect: redirect
  };
}

export function requestRegister(username, email, password, redirect) {
  return dispatch => {
    fetchData(dispatch, '/register', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: md5(md5(password))
      })
    }, function() {
      dispatch(register(redirect));
    });
  };
}

/**
 * 用户登录
 */
function login(redirect) {
  return {
    type: LOGIN,
    redirect: redirect
  };
}

export function requestLogin(email, password, redirect) {
  return dispatch => {
    fetchData(dispatch, '/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: md5(md5(password))
      })
    }, function() {
      dispatch(login(redirect));
    });
  };
}

