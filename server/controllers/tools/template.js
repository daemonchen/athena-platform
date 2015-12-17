var path = require('path');
var AdmZip = require('adm-zip');
var handler = require('../../utils/handler');
var code = require('../../utils/code');
var tempConfig = require('../../config/template');
var zipPath = path.join(tempConfig.zip, 'template.zip');
var tempPath = tempConfig.path;
var TemplateHelper = require('../../helpers/template');
var crypto = require('crypto');

exports.index = function(req, res) {
  TemplateHelper.findAll().then(function(templates) {
    var ret = {
      items: [{
        _id: 'default',
        name: '默认模板'
      }],
      version: 0
    };
    var signal = null;
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
      if (signal) {
        var md5 = crypto.createHash('md5');
        md5.update('' + signal.lastMod);
        ret.version = md5.digest('hex');
      }
    }
    handler.send(res, code.SUCCESS, ret);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};

exports.download = function(req, res) {
  var zip = new AdmZip();
  zip.addLocalFolder(tempPath);
  zip.writeZip(zipPath);

  res.setHeader('Content-disposition', 'attachment; filename=template.zip');
  res.setHeader('Content-type', 'application/zip, application/x-zip');
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.download(zipPath);
};
