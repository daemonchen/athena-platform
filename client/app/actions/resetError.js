import {ERROR_MESSAGE} from '../constants/ActionTypes';

/**
 * 重置错误信息
 */
export function resetError() {
  return {
    type: ERROR_MESSAGE,
    error: null
  };
}
