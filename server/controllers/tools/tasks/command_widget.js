/**
 * widget数据入库任务
 * 1.查询app是否存在
 * 2.查询module是否存在
 * 3.插入widget记录
 * 4.更新module信息
 * 5.插入command记录
 */
var code = require('../../../utils/code');
var handler = require('../../../utils/handler');
var AppHelper = require('../../../helpers/app');
var ModHelper = require('../../../helpers/mod');
var WidgetHelper = require('../../../helpers/widget');
var CommandHelper = require('../../../helpers/command');

module.exports = function(params, res) {
  var mod = null;
  if (params.appId && params.appId.length >= 0) {
    AppHelper.findOne({
      _id: params.appId
    }).then(function(app) {
      return ModHelper.findOne({
        _id: params.moduleId
      });
    }).then(function(modRecord) {
      mod = modRecord;

      return WidgetHelper.create({
        name: params.widget,
        app: params.appId,
        module: params.moduleId,
        author: params.user
      });
    }).then(function(widget) {
      mod.widgets.push(widget);
      mod.save();

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
      handler.handleError(res, code.FAILURE, res);
    });
  } else {
    handler.handleError(res, code.FAILURE, 'wrong appId');
  }
};

