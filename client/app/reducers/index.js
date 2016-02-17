import {combineReducers} from 'redux';
import errorMessage from './errorMessage';
import records from './records';
import projects from './projects';
import template from './template';
import initApps from './initApps';
import analysis from './analysis';

const rootReducer = combineReducers({
  records,
  projects,
  errorMessage,
  template,
  initApps,
  analysis
});

export default rootReducer;
