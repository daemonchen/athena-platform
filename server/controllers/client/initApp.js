var handler = require('../../utils/handler');
var code = require('../../utils/code');
var AppHelper = require('../../helpers/app');
var InitAppHelper = require('../../helpers/initApp');
var uuid = require('uuid');
var log4js = require('log4js');
var clientLog = log4js.getLogger('client');

exports.add = function(req, res) {
  var proname = req.body.pro_name;
  var template = req.body.template;
  var preview = req.body.preview;
  var deploys = req.body.deploys;

  if (!req.isAuthenticated()) {
    return handler.handleError(res, code.NO_LOGIN, 'user need login');
  }

  AppHelper.findOne({name: proname}, true).then(function(app) {
    if (app) {
      return handler.handleError(res, code.FAILURE, app.name + ' was created');
    }

    return InitAppHelper.create({
      _id: uuid.v1(),
      name: proname,
      author: req.user.name,
      template: template !== 'default' && template || null,
      preview: preview,
      deploys: deploys
    });
  }).then(function(app) {
    handler.send(res, code.SUCCESS, app);
  }).catch(function(err) {
    clientLog.error('add app: ', err);
    handler.handleError(res, code.FAILURE, err);
  });
};

exports.index = function(req, res) {
  InitAppHelper.findAll().then(function(apps) {
    handler.send(res, code.SUCCESS, apps);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  })
}
