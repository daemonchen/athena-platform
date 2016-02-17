var AppHelper = require('../../helpers/app');
var CommandHelper = require('../../helpers/command');
var ModHelper = require('../../helpers/mod');
var PageHelper = require('../../helpers/page');
var WidgetHelper = require('../../helpers/widget');
var CssHelper = require('../../helpers/css');
var JsHelper = require('../../helpers/js');
var ImageHelper = require('../../helpers/image');
var UserHelper = require('../../helpers/user');
var handler = require('../../utils/handler');
var code = require('../../utils/code');

exports.index = function(req, res) {
  AppHelper.findAll().then(function(apps) {
    handler.send(res, code.SUCCESS, apps);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};

exports.delete = function(req, res) {
  var appId = req.body.app;

  if (!req.user) {
    handler.handleError(res, code.NO_LOGIN, '您需要先登录');
    return;
  }

  if (appId) {
    AppHelper.findOne({_id: appId}).then(function(app) {
      app.remove();
    });

    ModHelper.remove({app: appId}).then(function(){});
    PageHelper.remove({app: appId}).then(function(){});
    WidgetHelper.remove({app: appId}).then(function(){});
    JsHelper.remove({app: appId}).then(function(){});
    CssHelper.remove({app: appId}).then(function(){});
    ImageHelper.remove({app: appId}).then(function(){});

    CommandHelper.remove({app: appId}).then(function() {}).catch(function(err) {
      console.log(err);
    });
  }

  handler.send(res, code.SUCCESS);
};

exports.users = function(req, res) {
  UserHelper.findAll().then(function(users) {
    handler.send(res, code.SUCCESS, users);
  }).catch(function(err) {
    console.log(err);
    handler.handleError(res, code.FAILURE, 'server error');
  });
};

exports.deleteUser = function(req, res) {
  if (!req.user) {
    handler.handleError(res, code.NO_LOGIN, '您需要先登录');
    return;
  }

  var user_id = req.body.user_id;

  if (user_id && user_id.length > 0) {
    UserHelper.remove({_id: user_id}).then(function(){}).catch(function(err) {
      console.log(err);
    });
  }

  handler.send(res, code.SUCCESS);
};
