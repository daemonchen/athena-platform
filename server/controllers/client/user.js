var passport = require('passport');
var code = require('../../utils/code');
var handler = require('../../utils/handler');
var cookieConfig = require('../../config/cookie');
var userHelper = require('../../helpers/user');
var log4js = require('log4js');
var clientLog = log4js.getLogger('client');

/**
 * 注册
 */
exports.register = function(req, res) {
  userHelper.create({
    email: req.body.email,
    name: req.body.username,
    password: req.body.password
  }).then(function(account) {
    passport.authenticate('local')(req, res, function () {
      res.cookie('username', req.user.name, cookieConfig);

      handler.send(res, code.SUCCESS);
    });
  }).catch(function(err) {
    var msg = '服务器连接失败，请稍后重试';
    if (err && /duplicate/ig.test(err.errmsg)) {
      if (/name/ig.test(err.errmsg)) {
        msg = '该姓名已存在';
      }

      if (err && /email/ig.test(err.errmsg)) {
        msg = '邮箱已被注册过';
      }
    }
    handler.handleError(res, code.FAILURE, msg);
    clientLog.error('register: ', err);
  });

};

/**
 * 登录
 */
exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return handler.handleError(res, code.FAILURE, '服务器错误');
    }

    if(!user) {
      return handler.handleError(res, code.FAILURE, '邮箱或密码输入有误');
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      res.cookie('username', req.user.name, cookieConfig);

      return handler.send(res, code.SUCCESS);
    });
  })(req, res, next);
};

