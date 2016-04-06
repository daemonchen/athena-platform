/**
 * 发布操作任务
 * 1.检查app是否存在
 * 2.数据入库
 */
var code = require('../../../utils/code');
var handler = require('../../../utils/handler');
var AppHelper = require('../../../helpers/app');
var CommandHelper = require('../../../helpers/command');
var log4js = require('log4js');
var toolsLog = log4js.getLogger('tools');

module.exports = function(params, res) {
  if (params.appId && params.appId.length >= 0) {
    AppHelper.findOne({
      _id: params.appId
    }).then(function(app) {
      return CommandHelper.create({
        cmd: params.cmd,
        args: params.args,
        app: params.appId,
        author: params.user,
        module: params.moduleId
        //modules: params.moduleId
      });
    }).then(function(command) {
      handler.send(res, code.SUCCESS, command);
    }).catch(function(err) {
      toolsLog.error('publish or deploy: ', err);
      handler.handleError(res, code.FAILURE, err);
    });
  } else {
    handler.handleError(res, code.FAILURE, 'wrong appId');
  }
};
