/**
 * page模型辅助函数
 */
var Page = require('../models/page');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Page.create(params, function(err, page) {
      if (err) {
        reject(err);
      }

      resolve(page);
    });
  });
}

exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Page.findOne(params).exec(function(err, page) {
      if (err) {
        return reject(err);
      }

      if (!page) {
        return reject('page is not found');
      }

      resolve(page);
    });
  });
};

exports.findWithMod = function(params) {
  return new Promise(function(resolve, reject) {
    Page.find(params).populate('module').exec(function(err, page) {
      if (err) {
        return reject(err);
      }

      resolve(page);
    });
  });
};

exports.findWithAllSub = function(params, modName, appName) {
  return new Promise(function(resolve, reject) {
    Page.find(params).populate('app module js css image widgets').populate({
      path: 'widgets',
      populate: {
        path: 'module',
        model: 'Mod'
      }
    }).populate({
      path: 'css',
      populate: {
        path: 'images',
        model: 'Image'
      }
    }).exec(function(err, pages) {
      var ret = [];
      if (err) {
        return reject(err);
      }

      //过滤掉不符合条件的
      if (modName || appName) {
        pages.forEach(function(page, index) {
          if (appName && appName !== page.app.name) {
            return;
          }

          if (modName && modName !== page.module.name) {
            return;
          }

          ret.push(page);
        });
      } else {
        ret = pages;
      }

      resolve(ret);
    });
  });
};

exports.remove = function(params) {
  return new Promise(function(resolve, reject) {
    Page.remove(params, function(err) {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
};

exports.count = function(params) {
  return new Promise(function(resolve, reject) {
    Page.count(params, function(err, sum) {
      if (err) {
        return reject(err);
      }

      resolve(sum);
    });
  });
}

