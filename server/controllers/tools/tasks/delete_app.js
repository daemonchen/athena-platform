var AppHelper = require('../../../helpers/app');
var CommandHelper = require('../../../helpers/command');
var ModHelper = require('../../../helpers/mod');
var PageHelper = require('../../../helpers/page');
var WidgetHelper = require('../../../helpers/widget');
var CssHelper = require('../../../helpers/css');
var JsHelper = require('../../../helpers/js');
var ImageHelper = require('../../../helpers/image');

module.exports = function(appId) {
  AppHelper.findOne({_id: appId}).then(function(app) {
    app.remove();
  });

  ModHelper.remove({app: appId}).then(function(){});
  PageHelper.remove({app: appId}).then(function(){});
  WidgetHelper.remove({app: appId}).then(function(){});
  JsHelper.remove({app: appId}).then(function(){});
  CssHelper.remove({app: appId}).then(function(){});
  ImageHelper.remove({app: appId}).then(function(){});

  CommandHelper.remove({app: appId}).then(function() {}).catch(function(err) {
    console.log(err);
  });
};
