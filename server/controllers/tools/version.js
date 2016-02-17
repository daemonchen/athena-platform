var VersionHelper = require('../../helpers/version');
var handler = require('../../utils/handler');
var code = require('../../utils/code');

exports.index = function(req, res) {
  VersionHelper.findOne().then(function(version) {
    if (!version) {
      return handler.handleError(res, code.FAILURE, '您需要先提交版本信息');
    }

    handler.send(res, code.SUCCESS, {
      v: version.version
    });
  }).catch(function(err) {
    console.log(err);
    handler.handleError(res, code.FAILURE, err);
  });
};

exports.update = function(req, res) {
  var ver = req.body.version;

  if (!ver) {
    return handler.handleError(res, code.FAILURE, 'version 不能为空');
  }

  VersionHelper.findOne().then(function(version) {
    if (!version) {
      return VersionHelper.create({version: ver});
    }

    version.version = ver;
    version.save();
    return Promise.resolve(version);
  }).then(function(version) {
     handler.send(res, code.SUCCESS, {
      v: version.version
    });
  }).catch(function(err) {
    console.log(err);
    handler.handleError(res, code.FAILURE, err);
  });
};
