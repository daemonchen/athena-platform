var handler = require('../../utils/handler');
var code = require('../../utils/code');
var AppHelper = require('../../helpers/app');
var InitAppHelper = require('../../helpers/initApp');

exports.add = function(req, res) {
  var proname = req.body.pro_name;
  var template = req.body.template;
  var host = req.body.host;
  var port = req.body.port;
  var user = req.body.user;
  var pass = req.body.pass;

  AppHelper.findOne({name: proname}, true).then(function(app) {

  if (!req.isAuthenticated()) {
    return handler.handleError(res, code.NO_LOGIN, 'user need login');
  }


    if (app) {
      return handler.handleError(res, code.FAILURE, app.name + ' was created');
    }

    return InitAppHelper.create({
      name: proname,
      author: req.user._id,
      template: template,
      preview: {
        host: host,
        port: port,
        user: user,
        pass: pass
      }
    });
  }).then(function(app) {
    handler.send(res, code.SUCCESS, app);
  }).catch(function(err) {
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
