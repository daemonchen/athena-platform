/**
 * version辅助器
 */
'use strict';

var Version = require('../models/version');

/**
 * 创建version记录
 */
exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Version.create(params, function(err, version) {
      if (err) {
        return reject(err);
      }

      resolve(version);
    });
  });
};

/**
 * 获取version记录
 */
exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Version.findOne(params).exec(function(err, version) {
      if (err) {
        return reject(err);
      }

      resolve(version);
    });
  });
};
