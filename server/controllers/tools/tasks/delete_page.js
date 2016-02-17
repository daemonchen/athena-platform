var AppHelper = require('../../../helpers/app');
var CommandHelper = require('../../../helpers/command');
var ModHelper = require('../../../helpers/mod');
var PageHelper = require('../../../helpers/page');
var WidgetHelper = require('../../../helpers/widget');
var CssHelper = require('../../../helpers/css');
var JsHelper = require('../../../helpers/js');
var ImageHelper = require('../../../helpers/image');

module.exports = function(mod, page, author) {
  PageHelper.findOne({module: mod, name: page}).then(function(pageRecord) {
    ModHelper.findOne({_id: pageRecord.module}).then(function(modRecord) {
      if (modRecord.pages && modRecord.pages.indexOf(pageRecord._id) !== -1) {
        modRecord.pages.splice(modRecord.pages.indexOf(pageRecord._id), 1);
        modRecord.save();
      }
    });

    pageRecord.widgets && pageRecord.widgets.forEach(function(widget) {
      WidgetHelper.findOne({_id: widget._id}).then(function(widget) {
        if (widget.loadedBy && widget.loadedBy.indexOf(pageRecord._id) !== -1) {
          widget.loadedBy.splice(widget.loadedBy.indexOf(pageRecord._id), 1);
          widget.save();
        }
      });
    });

    page.js && page.js.forEach(function(js) {
      JsHelper.findOne({_id: js}).then(function(js) {
        if (js.loadedBy && js.loadedBy.indexOf(pageRecord._id) !== -1) {
          js.loadedBy.splice(js.loadedBy.indexOf(pageRecord._id), 1);
          js.save();
        }
      });
    });

    page.css && page.css.forEach(function(css) {
      CssHelper.findOne({_id: css}).then(function(css) {
        if (css.loadedBy && css.loadedBy.indexOf(pageRecord._id) !== -1) {
          css.loadedBy.splice(css.loadedBy.indexOf(pageRecord._id), 1);
          css.save();
        }
      });
    });

    page.image && page.image.forEach(function(image) {
      ImageHelper.findOne({_id: image}).then(function(image) {
        if (image.loadedByPage && image.loadedByPage.indexOf(pageRecord._id) !== -1) {
          image.loadedByPage.splice(image.loadedByPage.indexOf(pageRecord._id), 1);
          image.save();
        }
      });
    });

    CommandHelper.create({
      cmd: 'delete',
      args: ['page ' + pageRecord.name],
      app: pageRecord.app,
      module: pageRecord.module,
      author: author
    }).then(function(command) {});

    pageRecord.remove();
  }).catch(function(err) {
    console.log(err);
  });

};
