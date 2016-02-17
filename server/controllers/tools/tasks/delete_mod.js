var AppHelper = require('../../../helpers/app');
var CommandHelper = require('../../../helpers/command');
var ModHelper = require('../../../helpers/mod');
var PageHelper = require('../../../helpers/page');
var WidgetHelper = require('../../../helpers/widget');
var CssHelper = require('../../../helpers/css');
var JsHelper = require('../../../helpers/js');
var ImageHelper = require('../../../helpers/image');

module.exports = function(mod) {
  ModHelper.findOne({_id: mod}).then(function(modRecord) {
    CommandHelper.remove({module: modRecord._id});

    //删除module下的页面
    PageHelper.findWithAllSub({module: modRecord._id}).then(function(pages) {
      pages.forEach(function(page) {
        page.widgets && page.widgets.forEach(function(widget) {
          WidgetHelper.findOne({_id: widget._id}).then(function(widget) {
            if (widget.loadedBy && widget.loadedBy.indexOf(page._id) !== -1) {
              widget.loadedBy.splice(widget.loadedBy.indexOf(page._id), 1);
              widget.save();
            }
          });
        });
        page.js && page.js.forEach(function(js) {
          JsHelper.findOne({_id: js}).then(function(js) {
            if (js.loadedBy && js.loadedBy.indexOf(page._id) !== -1) {
              js.loadedBy.splice(js.loadedBy.indexOf(page._id), 1);
              js.save();
            }
          });
        });
        page.css && page.css.forEach(function(css) {
          CssHelper.findOne({_id: css}).then(function(css) {
            if (css.loadedBy && css.loadedBy.indexOf(page._id) !== -1) {
              css.loadedBy.splice(css.loadedBy.indexOf(page._id), 1);
              css.save();
            }
          });
        });
        page.image && page.image.forEach(function(image) {
          ImageHelper.findOne({_id: image}).then(function(image) {
            if (image.loadedByPage && image.loadedByPage.indexOf(page._id) !== -1) {
              image.loadedByPage.splice(image.loadedByPage.indexOf(page._id), 1);
              image.save();
            }
          });
        });
        page.remove();
      });
    });


    //删除module下的组件
    WidgetHelper.find({module: modRecord._id}).then(function(widgets) {
      widgets.forEach(function(widget) {
        (function(widget) {
          widget.loadedBy && widget.loadedBy.forEach(function(page) {
            PageHelper.findOne({_id: page}).then(function(page) {
              if (page.widgets && page.widgets.indexOf(widget._id) !== -1) {
                page.widgets.splice(page.widgets.indexOf(widget._id), 1);
                page.save();
              }
            });
          });
        }(widget));

        widget.remove();
      });
    });

    //删除css
    CssHelper.find({
      module:modRecord._id
    }).then(function(css) {
      css.forEach(function(css) {
        (function(css) {
          css.loadedBy && css.loadedBy.forEach(function(page) {
            PageHelper.findOne({_id: page}).then(function(page) {
              if (page.css && page.css.indexOf(css._id) !== -1) {
                page.css.splice(page.css.indexOf(css._id), 1);
                page.save();
              }
            });
          });
        }(css));
        css.remove();
      });
    });

    //删除js
    JsHelper.find({
      module: modRecord._id
    }).then(function(jses) {
      jses.forEach(function(js) {
        (function(js) {
          js.loadedBy && js.loadedBy.forEach(function(page) {
            PageHelper.findOne({_id: page}).then(function(page) {
              if (page.js && page.js.indexOf(js._id) !== -1) {
                page.js.splice(page.js.indexOf(js._id), 1);
                page.save();
              }
            });
          });
        }(js));

        js.remove();
      });
    });

    //删除image
    ImageHelper.find({module: modRecord._id}).then(function(images) {
      images.forEach(function(image) {
        (function(image) {
          image.loadeByPage && image.loadeByPage.forEach(function(page) {
            PageHelper.findOne({_id: page}).then(function(page) {
              if (page.image && page.image.indexOf(image._id) !== -1) {
                page.image.splice(page.image.indexOf(image._id), 1);
                page.save();
              }
            });
          });

          image.loadedByCss && image.loadedByCss.forEach(function(css) {
            CssHelper.findOne({_id: css}).then(function(css) {
              if (css.images && css.images.indexOf(image._id) !== -1) {
                css.images.splice(css.images.indexOf(image._id), 1);
                css.save();
              }
            });
          });
        }(image));

        image.remove();
      });
    });

    modRecord.remove();
  }).catch(function(err) {
    console.log(err);
  });
};
