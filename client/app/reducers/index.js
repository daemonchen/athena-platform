import {combineReducers} from 'redux';
import errorMessage from './errorMessage';
import records from './records';
import projects from './projects';
import template from './template';
import initApps from './initApps';

const rootReducer = combineReducers({
  records,
  projects,
  errorMessage,
  template,
  initApps
});

export default rootReducer;
