/**
 * initApp 辅助函数
 */
var InitApp = require('../models/initApp');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    InitApp.create(params, function(err, app) {
      if (err) {
        return reject(err.errmsg);
      }

      resolve(app);
    });
  });
}

exports.findAll = function() {
  return new Promise(function(resolve, reject) {
    InitApp.find().populate('template author').sort({createTime: -1}).exec(function(err, apps) {
      if (err) {
        return reject(err);
      }

      resolve(apps);
    });
  });
}

exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    InitApp.findOne(params).populate('author template').exec(function(err, app) {
      if (err) {
        return reject(err);
      }

      resolve(app);
    })
  });
}
