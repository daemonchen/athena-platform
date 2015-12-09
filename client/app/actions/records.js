import {REQUEST_RECORDS} from '../constants/ActionTypes';
import {RECORDS_NUM} from '../constants/Config';
import fetchData from '../utils/fetchData';

/**
 * 请求获取命令记录
 */
function records(records, pagination) {
  return {
    type: REQUEST_RECORDS,
    records: records,
    pagination: pagination
  };
}

export function requestRecords(type = 'all', page = 0, appid = '') {
  return dispatch => {
    fetchData(dispatch, '/commands?type=' + type + '&page=' + page + '&appid=' + appid + '&length=' + RECORDS_NUM, function(json) {
      const {data} = json;
      dispatch(records(data.commands, data.pagination));
    });
  };
}

