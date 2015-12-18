var appTask = require('./tasks/command_app');
var moduleTask = require('./tasks/command_module');
var pageTask = require('./tasks/command_page');
var widgetTask = require('./tasks/command_widget');
var deployPublishTask = require('./tasks/command_deploy_publish');
var handler = require('../../utils/handler');
var code = require('../../utils/code');

exports.index = function(req, res) {
  var params = req.body;

  /**
   * 判断appId是否有效
   */
  if (!params.appId) {
    return handler.handleError(res, code.FAILURE, 'appid cannot be empty');
  }

  if (params.appId.length < 30) {
    return handler.handleError(res, code.FAILURE, 'appid was error');
  }

  switch (params.cmd) {
    case 'app':
      appTask(params, res);
      break;
    case 'module':
      moduleTask(params, res);
      break;
    case 'page':
      pageTask(params, res);
      break;
    case 'widget':
      widgetTask(params, res);
      break;
    case 'deploy':
    case 'publish':
      deployPublishTask(params, res);
      break;
    default: //默认不处理
  }
};
