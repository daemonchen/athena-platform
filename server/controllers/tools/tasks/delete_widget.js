var AppHelper = require('../../../helpers/app');
var CommandHelper = require('../../../helpers/command');
var ModHelper = require('../../../helpers/mod');
var PageHelper = require('../../../helpers/page');
var WidgetHelper = require('../../../helpers/widget');
var CssHelper = require('../../../helpers/css');
var JsHelper = require('../../../helpers/js');
var ImageHelper = require('../../../helpers/image');

module.exports = function(mod, widget, author) {
  WidgetHelper.findOne({module: mod, name: widget}).then(function(widgetRecord) {
    ModHelper.findOne({_id: widgetRecord.module._id}).then(function(modRecord) {
      if (modRecord.widgets && modRecord.widgets.indexOf(widgetRecord._id) !== -1) {
        modRecord.widgets.splice(modRecord.widgets.indexOf(widgetRecord._id), 1);
        modRecord.save();
      }
    });

    widgetRecord.loadedBy && widgetRecord.loadedBy.forEach(function(page) {
      PageHelper.findOne({_id: page}).then(function(pageRecord) {
        if (pageRecord.widgets && pageRecord.widgets.indexOf(widgetRecord._id) !== -1) {
          pageRecord.widgets.splice(pageRecord.widgets.indexOf(widgetRecord._id), 1);
          pageRecord.save();
        }
      });
    });

    CommandHelper.create({
      cmd: 'delete',
      author: author,
      app: widgetRecord.app,
      module: widgetRecord.module,
      args: ['widget ' + widgetRecord.name]
    }).then(function(command) {});

    widgetRecord.remove();
  }).catch(function(err) {
    console.log(err);
  });

};
