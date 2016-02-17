/**
 * app辅助函数
 */
var App = require('../models/app');

/**
 * create 创建app
 *
 * @param params app参数
 * @return {Object} Promise
 */
exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    App.create(params, function(err, app) {
      if (err) {
        reject(err);
      }

      resolve(app);
    });
  });
};

/**
 * findOne 获取一个app记录
 *
 * @param params app参数
 * @return {Object} Promise
 */
exports.findOne = function(params, isExist) {
  return new Promise(function(resolve, reject) {
    App.findOne(params).exec(function(err, app) {
      if (err) {
        reject(err);
      }

      if (!isExist && !app) {
        reject('app is not found');
      }

      resolve(app);
    });
  });
}

/**
 * 获取全部app
 */
exports.findAll = function(params) {
  return new Promise(function(resolve, reject) {
    App.find(params).sort({createTime: -1}).exec(function(err, apps) {
      if (err) {
        return reject(err);
      }

      resolve(apps);
    });
  });
}

/**
 * 获取单个app，带具体信息
 */
exports.findOneWithDesc = function(params) {
  return new Promise(function(resolve, reject) {
    App.findOne(params).populate('modules').populate({
      path: 'modules',
      populate: [{
        path: 'widgets',
        model: 'Widget',
        populate: {
          path: 'loadedBy',
          model: 'Page',
          populate: {
            path: 'module',
            model: 'Mod'
          }
        }
      },{
        path: 'pages',
        model: 'Page',
        populate: [{
          path: 'widgets',
          model: 'Widget',
          populate: {
            path: 'module',
            model: 'Mod'
          }
        },{
          path: 'js',
          model: 'Js'
        },{
          path: 'css',
          model: 'Css',
          populate: {
            path: 'images',
            model: 'Image'
          }
        }, {
          path: 'image',
          model: 'Image'
        }]
      }]
    }).exec(function(err, app) {
      if (err) {
        return reject(err);
      }

      if (!app) {
        return reject('app is null');
      }

      resolve(app);
    });
  });
}

exports.count = function(params) {
  return new Promise(function(resolve, reject) {
    App.count(params, function(err, sum) {
      if (err) {
        return reject(err);
      }

      resolve(sum);
    });
  });
}
