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

      if (!widget) {
        reject('widget is not found');
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
