'use strict';

/**
 * 获取上传模块的app以及模块信息
 */
var AppHelper = require('../../../helpers/app');
var ModHelper = require('../../../helpers/mod');

module.exports = function(appId, moduleId) {
  return Promise.all([
    AppHelper.findOne({_id: appId}),
    ModHelper.findOne({_id: moduleId}),
    ModHelper.findOne({app: appId, name: 'gb'})
  ]);
};
