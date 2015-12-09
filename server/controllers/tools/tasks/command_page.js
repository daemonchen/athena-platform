/**
 * page数据入库任务：
 * 1.查询app是否存在
 * 2.查询module是否存在
 * 3.插入page
 * 4.更新module信息
 * 5.插入command信息
 */
var code = require('../../../utils/code');
var handler = require('../../../utils/handler');
var AppHelper = require('../../../helpers/app');
var ModHelper = require('../../../helpers/mod');
var PageHelper = require('../../../helpers/page');
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
      return PageHelper.create({
        name: params.page,
        author: params.user,
        app: params.appId,
        module: params.moduleId
      });
    }).then(function(page) {
      mod.pages.push(page);
      mod.save();
      return CommandHelper.create({
        cmd: params.cmd,
        args: params.args,
        app: params.appId,
        author: params.user,
        module: params.moduleId
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
