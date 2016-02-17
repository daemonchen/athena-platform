'use strict';

var Js = require('../models/js');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Js.create(params, function(err, js) {
      if (err) {
        reject(err);
      }

      resolve(js);
    });
  });
};

exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Js.findOne(params).exec(function(err, js) {
      if (err) {
        reject(err);
      }

      resolve(js);
    });
  });
};

exports.findWithSub = function(params, modName, appName) {
  return new Promise(function(resolve, reject) {
    Js.find(params).populate('app module loadedBy').populate({
      path: 'loadedBy',
      populate: {
        path: 'module',
        model: 'Mod'
      }
    }).exec(function(err, jses) {
      var ret = [];
      if (err) {
        return reject(err);
      }

      if (modName || appName) {
        jses.forEach(function(js) {
          if (appName && appName !== js.app.name) {
            return;
          }
          if (modName && modName !== js.module.name) {
            return;
          }

          ret.push(js);
        });
      } else {
        ret = jses;
      }

      resolve(jses);
    });
  });
};

exports.find = function(params) {
  return new Promise(function(resolve, reject) {
    Js.find(params).exec(function(err, js) {
      if (err) {
        return reject(err);
      }

      resolve(js);
    });
  });
};

exports.remove = function(params) {
  return new Promise(function(resolve, reject) {
    Js.remove(params, function(err) {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
};
