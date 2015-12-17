var path = require('path');
var AdmZip = require('adm-zip');
var handler = require('../../utils/handler');
var code = require('../../utils/code');
var tempConfig = require('../../config/template');
var zipPath = path.join(tempConfig.zip, 'template.zip');
var tempPath = tempConfig.path;
var TemplateHelper = require('../../helpers/template');
var md5File = require('md5-file');
var lastModTime = new Date();
var isEmpty = true;
var zip = new AdmZip();

exports.index = function(req, res) {
  TemplateHelper.findAll().then(function(templates) {
    var ret = {
      items: [{
        _id: 'default',
        name: '默认模板'
      }],
      version: 0
    };
    var signal = {};
    if (templates.length > 0) {
      signal = templates[0];
      ret.items.push({
        _id: signal._id,
        name: signal.name
      });
      for (var i = 1, length = templates.length; i < length; i++) {
        if (signal.lastMod < templates[i].lastMod) {
          signal = templates[i];
        }
        ret.items.push({
          _id: templates[i]._id,
          name: templates[i].name
        });
      }
    }

    if (signal.lastMod) {
      if (lastModTime.getTime() !== signal.lastMod.getTime()) {
        lastModTime = signal.lastMod;
        zip.addLocalFolder(tempPath);
        zip.writeZip(zipPath);
      }
    } else {
      if (isEmpty) {
        isEmpty = false;
        zip.addLocalFolder(tempPath);
        zip.writeZip(zipPath);
      }
    }

    md5File(zipPath, function(err, sum) {
      if (err) {
        return handler.handleError(res, code.FAILURE, err);
      }

      ret.version = sum;
      handler.send(res, code.SUCCESS, ret);
    })
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};

exports.download = function(req, res) {
  zip.addLocalFolder(tempPath);
  zip.writeZip(zipPath);

  res.setHeader('Content-disposition', 'attachment; filename=template.zip');
  res.setHeader('Content-type', 'application/zip, application/x-zip');
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.download(zipPath);
};
