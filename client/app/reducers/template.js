import {REQUEST_TEMPLATES, REQUEST_TEMPLATE} from '../constants/ActionTypes';

export default function template(state = {
  templates: [],
  template: {}
}, action) {
  switch (action.type) {
  case REQUEST_TEMPLATES:
    return Object.assign({}, state, {
      templates: action.templates
    });
  case REQUEST_TEMPLATE:
    return Object.assign({}, state, {
      template: action.template
    });
  default:
    return state;
  }
};
