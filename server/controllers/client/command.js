var code = require('../../utils/code');
var handler = require('../../utils/handler');
var CommandHelper = require('../../helpers/command');

var cmdArr = ['app', 'module', 'page', 'widget'];
exports.index = function(req, res) {
  var params = {};
  var cmd = req.query.type;
  var page = req.query.page > 1 ? req.query.page - 1 : 0;
  var length = req.query.length ? req.query.length : 50;
  var appid = req.query.appid ? req.query.appid : '';

  if (cmd && cmdArr.indexOf(cmd) !== -1) {
    params['cmd'] = cmd;
  }

  if (appid) {
    params['app'] = {_id: appid};
  }

  Promise.all([CommandHelper.all(params, page, length), CommandHelper.count(params)]).then(function(result) {
    var commands = result[0];
    var count = result[1];
    var pagination = {current: page + 1, hasNextPage: false};

    if (length !== 0) {
      pagination.count = Math.ceil(count / length);
    }

    handler.send(res, code.SUCCESS, {
      commands: commands,
      pagination: pagination
    });
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, '服务器出错');
  });
};
