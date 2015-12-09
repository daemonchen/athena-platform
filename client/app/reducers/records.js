import {REQUEST_RECORDS} from '../constants/ActionTypes';

export default function records(state = {
  records: [],
  pagination: {}
}, action) {
  switch (action.type) {
  case REQUEST_RECORDS:
    return Object.assign({}, state, {
      records: action.records,
      pagination: action.pagination
    });
  default:
    return state;
  }
}
