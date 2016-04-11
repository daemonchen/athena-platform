/**
 * 保存gb模块的版本号，用于同步更新模块
 */
var path = require('path');
var fs = require('fs');
var handler = require('../../utils/handler');
var code = require('../../utils/code');
var log4js = require('log4js');
var toolsLog = log4js.getLogger('tools');
var JsHelper = require('../../helpers/js');
var CssHelper = require('../../helpers/css');
var uploadConfig = require('../../config/upload');
var md5File = require('md5-file');

/**
 * 获取gb模块map.json文件的内容
 */
exports.index = function(req, res) {
  var app = req.query.app;

  if (!app) {
    return handler.handleError(res, code.FAILURE, 'app cannot be empty');
  }

  var mapFile = path.join(uploadConfig.path, 'unzip', app, 'gb', 'map.json');

  fs.exists(mapFile, function(exists) {
    if (exists) {
      fs.readFile(mapFile, function(err, data) {
        if (err) {
          toolsLog.error(err);
          handler.handleError(res, code.FAILURE, 'read file occurred error');
          return;
        }

        handler.send(res, code.SUCCESS, JSON.parse(data.toString()));
      });
    } else {
      toolsLog.error(app, 'map.json cannot be found');
      handler.send(res, code.SUCCESS, {});
    }
  });

};

/**
 * 获取gb模块map.json的md5加密串
 */
exports.md5 = function(req, res) {
  var app = req.query.app;

  if (!app) {
    return handler.handleError(res, code.FAILURE, 'app cannot be empty');
  }

  var mapFile = path.join(uploadConfig.path, 'unzip', app, 'gb', 'map.json');

  fs.exists(mapFile, function(exists) {
    if (exists) {
      md5File(mapFile, function(err, sum) {
        if (err) {
          toolsLog.error(err);
          return handler.handleError(res, code.FAILURE, 'md5 occurred error');
        }

        handler.send(res, code.SUCCESS, {v: sum});
      });
    } else {
      handler.send(res, code.SUCCESS, {v: null});
    }
  });
};

