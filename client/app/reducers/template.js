import {REQUEST_TEMPLATES, REQUEST_TEMPLATE, TEMPLATE_CONTENT, UPDATE_TEMPLATE} from '../constants/ActionTypes';

export default function template(state = {
  templates: [],
  template: {},
  content: ''
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
  case UPDATE_TEMPLATE:
    console.log('update template');
    return Object.assign({}, state, {
      template: action.template,
      content: action.content
    });
  case TEMPLATE_CONTENT:
    return Object.assign({}, state, {
      content: action.content
    });
  default:
    return state;
  }
};
