var Template = require('../models/template');

exports.create = function(params) {
  return new Promise(function(resolve, reject) {
    Template.create(params, function(err, template) {
      if (err) {
        return reject(err);
      }

      resolve(template);
    });
  });
};

exports.findAll = function() {
  return new Promise(function(resolve, reject) {
    Template.find().sort({createTime: 1}).exec(function(err, templates) {
      if (err) {
        return reject(err);
      }

      resolve(templates);
    });
  });
};

exports.findOne = function(params) {
  return new Promise(function(resolve, reject) {
    Template.findOne(params).exec(function(err, template) {
      if (err) {
        return reject(err);
      }

      if (!template) {
        return reject('template cannot be found');
      }

      resolve(template);
    });
  });
}
