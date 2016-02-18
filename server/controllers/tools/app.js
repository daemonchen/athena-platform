var handler = require('../../utils/handler');
var code = require('../../utils/code');
var AppHelper = require('../../helpers/app');
var InitAppHelper = require('../../helpers/initApp');
var log4js = require('log4js');
var toolsLog = log4js.getLogger('tools');

exports.desc = function(req, res) {
  var proname = req.query.appname;

  AppHelper.findOne({name: proname}, true).then(function(app) {
    if (app) {
      return  handler.handleError(res, code.FAILURE, proname + ' was inited');
    }

    return InitAppHelper.findOne({name: proname});
  }).then(function(app) {
    if (!app) {
      return handler.handleError(res, code.FAILURE, proname + ' cannot be found');
    }

    var record = {
      _id: app._id,
      name: app.name,
      author: app.author,
      template: app.template,
      preview: app.preview,
      createTime: app.createTime,
      deploys: app.deploys
    };

    if (!app.template) {
      record.template = {
        _id: 'default',
        name: '默认模板'
      };
    }
    handler.send(res, code.SUCCESS, record);
  }).catch(function(err) {
    toolsLog.error('app desc: ', err);
    handler.handleError(res, code.FAILURE, err);
  });
};
