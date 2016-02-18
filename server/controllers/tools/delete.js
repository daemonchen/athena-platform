var deleteAppTask = require('./tasks/delete_app');
var deleteModTask = require('./tasks/delete_mod');
var deletePageTask = require('./tasks/delete_page');
var deleteWidgetTask = require('./tasks/delete_widget');
var handler = require('../../utils/handler');
var code = require('../../utils/code');
var log4js = require('log4js');
var toolsLog = log4js.getLogger('tools');

exports.index = function(req, res) {
  var cmd = req.body.cmd;
  var appId = req.body.app;
  var mod = req.body.mod;
  var page = req.body.page;
  var widget = req.body.widget;
  var author = req.body.author;

  switch (cmd) {
    case 'app':
      if (appId) {
        deleteAppTask(appId);
      } else {
        return handler.handleError(res, code.FAILURE, 'app参数不能为空');
      }
    break;
    case 'module':
      if (mod) {
        deleteModTask(mod);
      } else {
        return handler.handleError(res, code.FAILURE, 'mod参数不能为空');
      }
    break;
    case 'page':
      if (mod && page && author) {
        deletePageTask(mod, page, author);
      } else {
        return handler.handleError(res, code.FAILURE, 'mod、page以及author参数不能为空');
      }
    break;
    case 'widget':
      if (mod && widget && author) {
        deleteWidgetTask(mod, widget, author);
      } else {
        return handler.handleError(res, code.FAILURE, 'mod、widget以及author参数不能为空');
      }
      break;
    default:
      break;
  }

  toolsLog.info('delete: ', req.body);
  handler.send(res, code.SUCCESS);
};
