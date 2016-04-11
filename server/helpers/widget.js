/**
 * 组件辅助器
 */
'use strict';

var Widget = require('../models/widget');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Widget.create(params, function(err, widget) {
      if (err) {
        reject(err);
      }

      resolve(widget);
    });
  });
};

exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Widget.findOne(params).populate('module').exec(function(err, widget) {
      if (err) {
        reject(err);
      }

      resolve(widget);
    });
  });
}

exports.findWithSub = function(params, modName, appName) {
  return new Promise(function(resolve, reject) {
    Widget.find(params).populate('app module loadedBy').populate({
      path: 'loadedBy',
      populate: {
        path: 'module',
        model: 'Mod'
      }
    }).exec(function(err, widgets) {
      var ret = [];
      if (err) {
        return reject(err);
      }

      if (appName || modName) {
        widgets.forEach(function(widget) {
          if (appName && appName !== widget.app.name) {
            return;
          }

          if (modName && modName !== widget.module.name) {
            return;
          }

          ret.push(widget);
        });
      } else {
        ret = widgets;
      }

      resolve(ret);
    });
  });
};

exports.remove = function(params) {
  return new Promise(function(resolve, reject) {
    Widget.remove(params, function(err) {
      if (err) {
        return reject(err);
      }

      resolve(true);
    });
  });
}

exports.find = function(params) {
  return new Promise(function(resolve, reject) {
    Widget.find(params).exec(function(err, widgets) {
      if (err) {
        return reject(err);
      }

      resolve(widgets);
    })
  });
}

exports.count = function(params) {
  return new Promise(function(resolve, reject) {
    Widget.count(params, function(err, sum) {
      if (err) {
        return reject(err);
      }

      resolve(sum);
    });
  });
}
