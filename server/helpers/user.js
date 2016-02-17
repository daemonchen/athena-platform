/**
 * 用户表操作辅助
 */
'use strict';

var User = require('../models/user');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    User.create(params, function (err, user) {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

exports.findAll = function(params) {
  return new Promise(function(resolve, reject) {
    User.find(params).exec(function(err, users) {
      if (err) {
        return reject(err);
      }

      resolve(users);
    });
  });
}

exports.remove = function(params) {
  return new Promise(function(resolve, reject) {
    User.remove(params, function(err) {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
}
