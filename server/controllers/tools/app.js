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

    handler.send(res, code.SUCCESS, app);
  }).catch(function(err) {
    handler.handleError(res, code.FAILURE, err);
  });
};
