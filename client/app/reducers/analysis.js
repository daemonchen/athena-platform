import {ANALYSIS} from '../constants/ActionTypes';

export default function analysis(state = {
  analysis: {}
}, action) {
  switch (action.type) {
  case ANALYSIS:
    return Object.assign({}, state, {
      analysis: action.analysis
    });
  default:
    return state;
  }
}

