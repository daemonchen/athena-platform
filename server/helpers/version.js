var Version = require('../models/version');

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
