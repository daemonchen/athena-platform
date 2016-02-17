'use strict';

var Css = require('../models/css');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Css.create(params, function(err, css) {
      if (err) {
        reject(err);
      }

      resolve(css);
    });
  });
};

exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Css.findOne(params, function(err, css) {
      if (err) {
        reject(err);
      }

      resolve(css);
    });
  });
};

exports.findWithAllSub = function(params, modName, appName) {
  return new Promise(function(resolve, reject) {
    Css.find(params).populate('app module loadedBy images').populate({
      path: 'loadedBy',
      populate: {
        path: 'module',
        model: 'Mod'
      }
    }).exec(function(err, csses) {
      var ret = [];
      if (err) {
        return reject(err);
      }

      if (appName || modName) {
        csses.forEach(function(css) {
          if (appName && appName !== css.app.name) {
            return;
          }

          if (modName && modName !== css.module.name) {
            return;
          }

          ret.push(css);
        });
      } else {
        ret = csses;
      }

      resolve(ret);
    });
  });
};

exports.find = function(params) {
  return new Promise(function(resolve, reject) {
    Css.find(params).exec(function(err, css) {
      if (err) {
        return reject(err);
      }

      resolve(css);
    });
  });
};

exports.remove = function(params) {
  return new Promise(function(resolve, reject) {
    Css.remove(params, function(err) {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
};
