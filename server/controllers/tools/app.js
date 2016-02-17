var handler = require('../../utils/handler');
var code = require('../../utils/code');
var AppHelper = require('../../helpers/app');
var InitAppHelper = require('../../helpers/initApp');

exports.desc = function(req, res) {
  var proname = req.query.appname;

  AppHelper.findOne({name: proname}, true).then(function(app) {
    if (app) {
      return  handler.handleError(res, code.FAILURE, proname + ' was inited');
    }

    return InitAppHelper.findOne({name: proname});
  }).then(function(app) {
    if (!app) {
      return handler.handleError(res, code.FAILURE, proname + ' cannot be found');
    }

    var record = {
      _id: app._id,
      name: app.name,
      author: app.author,
      template: app.template,
      preview: app.preview,
      createTime: app.createTime,
      deploys: app.deploys
    };
    if (!app.template) {
      record.template = {
        _id: 'default',
        name: '默认模板'
      };
    }
    handler.send(res, code.SUCCESS, record);
  }).catch(function(err) {
    console.log(err);
    handler.handleError(res, code.FAILURE, err);
  });
};
