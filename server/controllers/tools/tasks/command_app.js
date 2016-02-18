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
var log4js = require('log4js');
var toolsLog = log4js.getLogger('tools');

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
    toolsLog.error('add app: ', err);
    var msg = '服务器连接失败，请稍后重试';
    if (err && /duplicate/ig.test(err.errmsg)) {
      msg = '服务器已存在同名的项目，麻烦改个名字';
    }

    handler.handleError(res, code.FAILURE, msg);
  });
};

