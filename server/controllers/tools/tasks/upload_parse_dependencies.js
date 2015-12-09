'use strict';
/**
 * 解析页面依赖任务
 * 1.查找Page
 * 2.查找widget
 * 3.更新widget loadedBy
 * 4.更新page widgets
 * 5.删除widget依赖
 */
var PageHelper = require('../../../helpers/page');
var WidgetHelper = require('../../../helpers/widget');

module.exports = function(moduleId, dependencies) {
  var promises = [];

  function updatePage(page, dependency) {
    var pageRecord = null;
    return new Promise(function(resolve, reject) {
      PageHelper.findOne({module: moduleId, name: page.replace('.html', '')}).then(function(page) {
        pageRecord = page;
        return Promise.all(dependency.map(function(widget) {
          return updateWidget(widget, page);
        }));
      }).then(function(widgets) {
        var diff = [];
        var included = false;
        pageRecord.widgets.forEach(function(widget) {
          included = false;
          widgets.forEach(function(wid) {
            if ('' + widget === '' + wid) {
              included = true;
            }
          });

          if (!included) {
            diff.push(widget);
          }
        });

        pageRecord.widgets = widgets;
        pageRecord.save();
        //解除widget依赖
        return deleteRely(diff, pageRecord);
      }).then(function(widgets) {
        resolve(widgets);
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  function deleteRely(diff, pageRecord) {
    return new Promise(function(resolve, reject) {
      Promise.all(diff.map(function(widget) {
        return WidgetHelper.findOne({_id: widget});
      })).then(function(widgets) {
        widgets.forEach(function(widget) {
          var pageIndex = widget.loadedBy.indexOf(pageRecord._id);
          if (pageIndex !== -1) {
            widget.loadedBy.splice(pageIndex, 1);
            widget.save();
          }
        });
        resolve(widgets);
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  function updateWidget(widget, page) {
    return new Promise(function(resolve, reject) {
      WidgetHelper.findOne({module: widget.moduleId, name: widget.widgetName}).then(function(widgetInfo) {
        if (widget.exists) {
          if (widgetInfo.loadedBy.indexOf(page._id) === -1) {
            widgetInfo.loadedBy.push(page);
            widgetInfo.save();
          }
        }
        resolve(widgetInfo._id);
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  for (var page in dependencies) {
    promises.push(updatePage(page, dependencies[page]));
  }

  return Promise.all(promises);
};
