/**
 * 命令模型辅助器
 */
var Command = require('../models/command');

/**
 * create 创建命令
 *
 * @param params
 * @return {Object} Promise
 */
exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Command.create(params, function(err, command) {
      if (err) {
        return reject(err);
      }

      resolve(command);
    });
  });
};

/**
 * 获取命令记录
 */
exports.all = function(params, page, length) {
  var page = page || 0;
  var length = length || 0;
  return new Promise(function(resolve, reject) {
    Command.find(params).populate('app').populate('module').sort({createTime: -1}).skip(page * length).limit(length).exec(function(err, commands) {
      if (err) {
        return reject(err);
      }

      resolve(commands);
    });
  });
};

/**
 * 获取命令记录总数
 */
exports.count = function(params) {
  return new Promise(function(resolve, reject) {
    Command.count(params, function(err, count) {
      if (err) {
        return reject(err);
      }

      resolve(count);
    });
  });
}

/**
 * 删除命令记录
 */
exports.remove = function(params) {
  return new Promise(function(resolve, reject) {
    Command.remove(params, function(err) {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
}
