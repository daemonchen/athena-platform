/**
 * 创建模块数据入库任务
 * 1.获取app
 * 2.创建module记录
 * 3.更新app中module列表
 */
var code = require('../../../utils/code');
var handler = require('../../../utils/handler');
var AppHelper = require('../../../helpers/app');
var ModHelper = require('../../../helpers/mod');
var CommandHelper = require('../../../helpers/command');

module.exports = function(params, res) {
  var app = null;
  if (params.appId && params.appId.length >= 0) {
    AppHelper.findOne({
      _id: params.appId
    }).then(function(appRecord) {
      app = appRecord;
      return ModHelper.create({
        _id: params.moduleId,
        app: params.appId,
        name: params.moduleName,
        author: params.user
      });
    }).then(function(mod) {
      app.modules.push(mod);
      app.save();

      return CommandHelper.create({
        cmd: params.cmd,
        args: params.args,
        app: params.appId,
        module: params.moduleId,
        author: params.user
      });
    }).then(function(command) {
      handler.send(res, code.SUCCESS, command);
    }).catch(function(err) {
      handler.handleError(res, code.FAILURE, err);
    });
  } else {
    handler.handleError(res, code.FAILURE, 'wrong appId');
  }
};
