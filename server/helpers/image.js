'use strict';

var Image = require('../models/image');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Image.create(params, function(err, image) {
      if (err) {
        reject(err);
      }

      resolve(image);
    });
  });
};

exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Image.findOne(params).exec(function(err, image) {
      if (err) {
        reject(err);
      }

      resolve(image);
    });
  });
};

exports.findWithSub = function(params) {
  return new Promise(function(resolve, reject) {
    Image.find(params).populate('app module loadedByCss loadedByPage').populate({
      path: 'loadedByCss',
      populate: {
        path: 'module',
        model: 'Mod'
      }
    }).populate({
      path: 'loadedByPage',
      populate: {
        path: 'module',
        model: 'Mod'
      }
    }).exec(function(err, images) {
      if (err) {
        return reject(err);
      }

      resolve(images);
    });
  });
}
