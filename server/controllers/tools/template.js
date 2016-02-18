var path = require('path');
var handler = require('../../utils/handler');
var code = require('../../utils/code');
var tempConfig = require('../../config/template');
var zipPath = path.join(tempConfig.zip, 'template.zip');
var tempPath = tempConfig.path;
var TemplateHelper = require('../../helpers/template');
var md5File = require('md5-file');
var log4js = require('log4js');
var toolsLog = log4js.getLogger('tools');

exports.index = function(req, res) {
  TemplateHelper.findAll().then(function(templates) {
    var ret = {
      items: [{
        _id: 'default',
        name: '默认模板'
      }],
      version: 0
    };
    if (templates.length > 0) {
      for (var i = 0, length = templates.length; i < length; i++) {
        ret.items.push({
          _id: templates[i]._id,
          name: templates[i].name
        });
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
    toolsLog.error('template version: ', err);
  });
};

exports.download = function(req, res) {
  res.setHeader('Content-disposition', 'attachment; filename=template.zip');
  res.setHeader('Content-type', 'application/zip, application/x-zip');
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.download(zipPath);
};
