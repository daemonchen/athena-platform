/**
 * 模块辅助
 */
var Mod = require('../models/mod');

/**
 * create 创建模块
 *
 * @param params
 * @return {Object} Promise
 */
exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Mod.create(params, function(err, mod) {
      if (err) {
        return reject(err);
      }

      resolve(mod);
    });
  });
};

/**
 * findOne 查询某个模块
 *
 * @param params
 * @return {Object} Promise
 */
exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Mod.findOne(params, function(err, mod) {
      if (err) {
        reject(err);
      }

      if (!mod) {
        reject('mod was not found');
      }

      resolve(mod);
    })
  });
};

/**
 * 删除模块
 */
exports.remove = function(params) {
  return new Promise(function(resolve, reject) {
    Mod.remove(params, function(err) {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
};

exports.findAll = function(params) {
  return new Promise(function(resolve, reject) {
    Mod.find(params).exec(function(err, mods) {
      if (err) {
        return reject(err);
      }

      resolve(mods);
    });
  });
};

exports.count = function(params) {
  return new Promise(function(resolve, reject) {
    Mod.count(params, function(err, sum) {
      if (err) {
        return reject(err);
      }

      resolve(sum);
    });
  });
}
