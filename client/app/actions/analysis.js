import {ANALYSIS} from '../constants/ActionTypes';
import fetchData from '../utils/fetchData';

function analysis(data) {
  return {
    type: ANALYSIS,
    analysis: data
  };
}

export function requestAnalysis() {
  return dispatch => {
    fetchData(dispatch, '/analysis', function(json) {
      dispatch(analysis(json.data));
    });
  }
};
