var code = require('../../utils/code');
var handler = require('../../utils/handler');
var AppHelper = require('../../helpers/app');
var searchFragment = require('./tasks/app_search_fragment');
var searchPage = require('./tasks/app_search_page');
var searchWidget = require('./tasks/app_search_widget');
var searchCss = require('./tasks/app_search_css');
var searchJs = require('./tasks/app_search_js');
var searchImage = require('./tasks/app_search_image');
var log4js = require('log4js');
var clientLog = log4js.getLogger('client');

exports.index = function(req, res) {
  AppHelper.findAll().then(function(apps) {
    handler.send(res, code.SUCCESS, apps);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};

exports.desc = function(req, res) {
  var appid = req.query.appid;

  if (!appid) {
    return handler.handleError(res, code.FAILURE, 'error appid');
  }

  AppHelper.findOneWithDesc({_id: appid}).then(function(app) {
    handler.send(res, code.SUCCESS, app);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};

exports.search = function(req, res) {
  var appid = req.query.appid;
  var search = req.query.search && req.query.search.trim();

  if (!appid) {
    return handler.handleError(res, code.FAILURE, 'error appid');
  }

  if (!search || search === '') {
    return handler.handleError(res, code.FAILURE, 'search text cannot be empty');
  }

  //判断search类型
  var type = '';

  var lastIndex = search.lastIndexOf('.');

  if (lastIndex !== -1) {
    type = search.substr(lastIndex + 1);
  }

  switch (type) {
    case 'shtml': //查询页面片
      searchFragment(appid, search).then(function(fragment) {
        handler.send(res, code.SUCCESS, {
          fragment: fragment
        });
      }).catch(function(err) {
        handler.handleError(res, code.FAILURE, err);
      });
      break;
    case 'html':
      searchPage(appid, search).then(function(page) {
        handler.send(res, code.SUCCESS, {
          page: page
        });
      }).catch(function(err) {
        handler.handleError(res, code.FAILURE, err);
      });
      break;
    case 'css':
      searchCss(appid, search).then(function(css) {
        handler.send(res, code.SUCCESS, {
          css: css
        });
      }).catch(function(err) {
        handler.handleError(res, code.FAILURE, err);
      });
      break;
    case 'js':
      searchJs(appid, search).then(function(js) {
        handler.send(res, code.SUCCESS, {
          js: js
        });
      }).catch(function(err) {
        handler.handleError(res, code.FAILURE, err);
      });
      break;
    case 'png':
    case 'jpg':
    case 'gif':
      searchImage(appid, search).then(function(image) {
        handler.send(res, code.SUCCESS, {
          image: image
        });
      }).catch(function(err) {
        handler.handleError(res, code.FAILURE, err);
      });
      break;
    default:
      Promise.all([searchFragment(appid, search), searchWidget(appid, search), searchImage(appid, search), searchPage(appid, search), searchCss(appid, search), searchJs(appid, search)]).then(function(result) {
        handler.send(res, code.SUCCESS, {
          fragment: result[0],
          widget: result[1],
          image: result[2],
          page: result[3],
          css: result[4],
          js: result[5]
        });
      }).catch(function(err) {
        clientLog.error('app search: ', err);
        handler.handleError(res, code.FAILURE, err);
      });
  }
}

exports.update = function(req, res) {
  var appid = req.query.appid;
  var members = req.body.members;

  if (!req.isAuthenticated()) {
    return handler.handleError(res, code.NO_LOGIN, 'user need login');
  }

  if (!appid) {
    return handler.handleError(res, code.FAILURE, 'error appid');
  }

  AppHelper.findOne({_id: appid}).then(function(app) {
    app.members = members && members.split(',') || [];

    app.save(function(err, app) {
      if (err) {
        return handler.handleError(res, code.FAILURE, err);
      }

      handler.send(res, code.SUCCESS, app);
    });
  }).catch(function(err) {
    clientLog.error('app update: ', err);
    handler.handleError(res, code.FAILURE, err);
  });
}
