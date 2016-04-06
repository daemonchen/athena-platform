import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'babel-core/polyfill';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import configureStore from './store/configureStore';
import history from './utils/history';
import {RouteConfig} from './routes';
import 'normalize.css';
import './css/style.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={RouteConfig}/>
  </Provider>,
  document.getElementById('root')
);

