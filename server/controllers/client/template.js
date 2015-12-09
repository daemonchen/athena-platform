var fs = require('fs');
var path = require('path');
var handler = require('../../utils/handler');
var code = require('../../utils/code');
var TemplateHelper = require('../../helpers/template');
var templatePath = require('../../config/template').path;

exports.add = function(req, res) {
  var templateName = req.body.templateName;
  var html = req.body.html || '';
  var js = req.body.js || '';
  var css = req.body.css || '';

  if (!req.isAuthenticated()) {
    return handler.handleError(res, code.NO_LOGIN, 'user need login');
  }

  if (!templateName && templateName !== '') {
    return handler.handleError(res, code.FAILURE, 'template name cannot be empty');
  }

  TemplateHelper.create({
    name: templateName,
    author: req.user._id
  }).then(function(template) {
    var tempPath = path.join(templatePath, '' + template._id);
    fs.mkdir(tempPath, function(err) {
      if (err) {
        return handler.handleError(res, code.FAILURE, err);
      }

      fs.writeFile(path.join(tempPath, 'index.html'), html, 'utf-8');
      fs.writeFile(path.join(tempPath, 'gb.css'), css, 'utf-8');
      fs.writeFile(path.join(tempPath, 'gb.js'), js, 'utf-8');

      handler.send(res, code.SUCCESS, template);
    });
  }).catch(function(err) {
    console.log(err);
    return handler.handleError(res, code.FAILURE, err);
  });
};

exports.update = function(req, res) {
  var templateId = req.body.templateId;
  var templateName = req.body.templateName;
  var html = req.body.html || '';
  var js = req.body.js || '';
  var css = req.body.css || '';

  if (!req.isAuthenticated()) {
    return handler.handleError(res, code.NO_LOGIN, 'user need login');
  }

  if (!templateName && templateName !== '') {
    return handler.handleError(res, code.FAILURE, 'template name cannot be empty');
  }

  TemplateHelper.findOne({_id: templateId}).then(function(template){
    template.name = templateName;
    template.save();

    var tempPath = path.join(templatePath, '' + template._id);

    fs.writeFile(path.join(tempPath, 'index.html'), html, 'utf-8');
    fs.writeFile(path.join(tempPath, 'gb.css'), css, 'utf-8');
    fs.writeFile(path.join(tempPath, 'gb.js'), js, 'utf-8');

    handler.send(res, code.SUCCESS, template);
  }).catch(function(err) {
    return handler.handleError(res, code.FAILURE, err);
  });
}

exports.index = function(req, res) {
  TemplateHelper.findAll().then(function(templates) {
    handler.send(res, code.SUCCESS, templates);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};

exports.get = function(req, res) {
  var templateId = req.query.templateId;
  var ret = {};

  TemplateHelper.findOne({
    _id: templateId
  }).then(function(template) {
    ret._id = template._id;
    ret.name = template.name;

    var tempPath = path.join(templatePath, '' + template._id);
    return Promise.all([
      new Promise(function(resolve, reject) {
        fs.readFile(path.join(tempPath, 'index.html'), {encoding: 'utf-8'}, function(err, data) {
          if (err) {
            return reject(err);
          }

          resolve(data.toString());
        });
      }),
      new Promise(function(resolve, reject) {
        fs.readFile(path.join(tempPath, 'gb.css'), {encoding: 'utf-8'}, function(err, data) {
          if (err) {
            return reject(err);
          }

          resolve(data.toString());
        });
      }),
      new Promise(function(resolve, reject) {
        fs.readFile(path.join(tempPath, 'gb.js'), {encoding: 'utf-8'}, function(err, data) {
          if (err) {
            return reject(err);
          }

          resolve(data.toString());
        });
      })
    ]);
  }).then(function(ct) {
    ret.html = ct[0];
    ret.css = ct[1];
    ret.js = ct[2];

    handler.send(res, code.SUCCESS, ret);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};
