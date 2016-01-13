/**
 * 接收文件接口
 */
var fs = require('fs');
var path = require('path');
var code = require('../../utils/code');
var handler = require('../../utils/handler');
var uploadConfig = require('../../config/upload');
var unzipTask = require('./tasks/upload_unzip');
var parseFileTask = require('./tasks/upload_parse_file');
var getAppAndModuleTask = require('./tasks/upload_app_module');
var parseDependenciesTask = require('./tasks/upload_parse_dependencies');
var parseRevTask = require('./tasks/upload_parse_rev');
var parseIncludeTask = require('./tasks/upload_parse_include');

exports.index = function(req, res) {
  var appId = req.body.appId;
  var moduleId = req.body.moduleId;
  var previewAddr = req.body.preview || '';
  var fileSource = path.join(uploadConfig.path, 'source', req.file.filename);
  var fileDes = path.join(uploadConfig.path, 'unzip', appId, req.file.originalname.replace('.zip', ''));
  var map = null;
  var modInfo = null;
  var app = null;
  var mod = null;
  var gb = null;

  //检查appId
  if (!appId) {
    return handler.handleError(res, code.FAILURE, 'appid caonnot be found');
  }

  //检查文件是否存在
  fs.exists(fileSource, function(exists) {
    if (exists) {
      handler.send(res, code.SUCCESS);

      //解压缩
      unzipTask(fileSource, fileDes).then(function(zip) {
        //解析文件
        return parseFileTask(fileDes, appId);
      }).then(function(parseResult) {
        map = parseResult[0];
        modInfo = parseResult[1];

        //获取App和module信息
        return getAppAndModuleTask(appId, moduleId);
      }).then(function(ret){
        app = ret[0];
        mod = ret[1];
        gb = ret[2];

        //更新preview
        app.preview = previewAddr;

        //解析dependencies
        //如果是gb模块，只需要解析rev
        if (modInfo.module === 'gb') {
          return true;
        }
        return parseDependenciesTask(moduleId, map.dependency);
      }).then(function(dependencies) {
        //解析线上版本对应关系rev
        return parseRevTask(mod, map.rev);
      }).then(function(rev) {
        //解析页面关系
        //gb模块无需解析include
        if (modInfo.module === 'gb') {
          return true;
        }
        return parseIncludeTask(mod, app, gb, map.include);
      }).then(function(inlcudes) {
        console.log('parse success');
      }).catch(function(err) {
        console.log(err);
      });
    } else {
      handler.handleError(res, code.FAILURE, 'file is not exists');
    }
  });
};
