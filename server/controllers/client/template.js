var fs = require('fs');
var AdmZip = require('adm-zip');
var path = require('path');
var ncp = require('ncp').ncp;
var handler = require('../../utils/handler');
var code = require('../../utils/code');
var TemplateHelper = require('../../helpers/template');
var tempConfig = require('../../config/template');
var templatePath = tempConfig.path;
var zipPath = path.join(tempConfig.zip, 'template.zip');
var zip = new AdmZip();

exports.add = function(req, res) {
  var templateName = req.body.templateName;
  var content = req.body.content;
  var file = req.body.file;

  if (!req.isAuthenticated()) {
    return handler.handleError(res, code.NO_LOGIN, 'user need login');
  }

  if (!templateName && templateName !== '') {
    return handler.handleError(res, code.FAILURE, 'template name cannot be empty');
  }

  TemplateHelper.create({
    name: templateName,
    author: req.user._id,
    modify: [req.user._id]
  }).then(function(template) {
    //复制一份默认的
    var tempPath = path.join(templatePath, '' + template._id);

    ncp(path.join(templatePath, 'default'), tempPath, function (err) {
      if (err) {
        return handler.handleError(res, code.FAILURE, err);
      }

      var savePath = getSaveDir(file);

      if (savePath === '') {
        return handler.handleError(res, code.FAILURE, 'error file');
      }

      savePath = path.join(tempPath, savePath);
      //覆盖上传的文件
      fs.writeFile(savePath, content, 'utf-8', function(err) {
        //压缩模板文件
        zipTemplate();
      });

      handler.send(res, code.SUCCESS, template);
    });
  }).catch(function(err) {
    return handler.handleError(res, code.FAILURE, err);
  });
};

function getSaveDir(file) {
  var savePath = '';
  if (['gb.html', 'gb.css', 'gb.js', 'common.scss'].indexOf(file) !== -1) {
    savePath = 'app/' + '_' + file;
  }

  if (['page.html', 'page.css', 'page.js'].indexOf(file) !== -1) {
    savePath = 'page/' + file;
  }

  if (['widget.html', 'widget.css', 'widget.js'].indexOf(file) !== -1) {
    savePath = 'widget/' + file;
  }

  return savePath;
}

exports.getContent = function(req, res) {
  var templateId = req.query.templateId;
  var file = req.query.file;
  var template = 'default';

  if (templateId) {
    template = templateId;
  }
  var savePath = getSaveDir(file);

  if (!savePath) {
    return handler.handleError(res, code.FAILURE, 'file cannot found');
  }
  fs.readFile(path.join(templatePath, template, savePath), {encoding: 'utf-8'}, function(err, data) {
    if (err) {
      return handler.handleError(res, code.FAILURE, err);
    }

    handler.send(res, code.SUCCESS, data.toString());
  });
};

exports.update = function(req, res) {
  var templateId = req.body.templateId;
  var templateName = req.body.templateName;
  var content = req.body.content;
  var file = req.body.file;

  if (!req.isAuthenticated()) {
    return handler.handleError(res, code.NO_LOGIN, 'user need login');
  }

  if (!templateName && templateName !== '') {
    return handler.handleError(res, code.FAILURE, 'template name cannot be empty');
  }

  if (templateId === 'default') {
    var tempPath = path.join(templatePath, 'default');
    var savePath = getSaveDir(file);

    fs.writeFile(path.join(tempPath, savePath), content, 'utf-8', function(err) {
      //压缩模板文件
      zipTemplate();
    });
    handler.send(res, code.SUCCESS, {
      _id: 'default',
      name: '默认模板'
    });

    return;
  }

  TemplateHelper.findOne({_id: templateId}).then(function(template){
    template.name = templateName;
    template.modify = template.modify || [req.user._id];
    if (template.modify[template.modify.length - 1] + '' !== req.user._id + '') {
      template.modify.push(req.user._id);
    }
    template.save();

    var tempPath = path.join(templatePath, '' + template._id);
    var savePath = getSaveDir(file);

    fs.writeFile(path.join(tempPath, savePath), content, 'utf-8', function(err) {
      //压缩模板文件
      zipTemplate();
    });

    handler.send(res, code.SUCCESS, template);
  }).catch(function(err) {
    return handler.handleError(res, code.FAILURE, err);
  });
}

exports.index = function(req, res) {
  TemplateHelper.findAll().then(function(templates) {
    //if (Array.isArray(templates) && req.query.getDefault) {
      templates.unshift({_id: 'default', name: '默认模板'});
    //}
    handler.send(res, code.SUCCESS, templates);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};

exports.get = function(req, res) {
  var templateId = req.query.templateId;
  var ret = {};

  if (templateId === 'default') {
    handler.send(res, code.SUCCESS, {
      _id: 'default',
      name: '默认模板'
    });
    return;
  };

  TemplateHelper.findOne({
    _id: templateId
  }).then(function(template) {
    ret._id = template._id;
    ret.name = template.name;

    handler.send(res, code.SUCCESS, ret);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};

function zipTemplate() {
  try {
    zip.addLocalFolder(templatePath);
    zip.writeZip(zipPath);
  } catch(e) {
    console.log(e);
  }
}
