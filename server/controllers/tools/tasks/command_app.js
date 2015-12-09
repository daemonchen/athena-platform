/**
 * 创建app时数据入库任务
 * 1.创建app
 * 2.创建gb
 * 3.创建command
 */
var code = require('../../../utils/code');
var handler = require('../../../utils/handler');
var AppHelper = require('../../../helpers/app');
var ModHelper = require('../../../helpers/mod');
var CommandHelper = require('../../../helpers/command');

module.exports = function(params, res) {
  var app = null;

  AppHelper.create({
    name: params.appName,
    _id: params.appId,
    author: params.user,
  }).then(function(appRecord) {
    app = appRecord;
    return ModHelper.create({
      _id: params.commonModuleId,
      name: params.commonModuleName,
      author: params.user,
      app: params.appId
    });
  }).then(function(mod) {
    app.modules.push(mod);
    app.save();
    return CommandHelper.create({
      cmd: params.cmd,
      args: params.args,
      app: params.appId,
      author: params.user
    });
  }).then(function(command) {
    handler.send(res, code.SUCCESS, command);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};

