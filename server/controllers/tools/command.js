var appTask = require('./tasks/command_app');
var moduleTask = require('./tasks/command_module');
var pageTask = require('./tasks/command_page');
var widgetTask = require('./tasks/command_widget');
var deployPublishTask = require('./tasks/command_deploy_publish');

exports.index = function(req, res) {
  var params = req.body;

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
