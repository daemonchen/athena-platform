var fs = require('fs');
var path = require('path');
var ModHelper = require('../../../helpers/mod');
var WidgetHelper = require('../../../helpers/widget');
var templateBuilder = require('lodash.template');

module.exports = function(fileDes, appId) {
  return Promise.all([new Promise(function(resolve, reject) {
    fs.readFile(path.join(fileDes, 'map.json'), function(err, data) {
      if (err) {
        return reject(err);
      }

      resolve(JSON.parse(data.toString()));
    });
  }), new Promise(function(resolve, reject) {
    fs.exists(path.join(fileDes, 'module-conf.js'), function(exists) {
      if (!exists) {
        return reject('module-conf.js was not existed');
      }

      var modConf = require(path.join(fileDes, 'module-conf.js'));
      resolve(modConf);

      /**
       * 更新优化统计
       */
      fs.readFile(path.join(fileDes, 'statistics.json'), function(err, data) {
        if (err) {
          return;
        }

        var statistic = JSON.parse(data.toString());

        var optimize = statistic.optimize;
        if (optimize) {
          ModHelper.findOne({_id: modConf.moduleId}).then(function(mod) {
            var css_compress = 0;
            if (optimize.css) {
              for (var key in optimize.css) {
                css_compress += optimize.css[key].saved;
              }
            }
            var js_compress = 0;
            if (optimize.js) {
              for (var key in optimize.js) {
                js_compress += optimize.js[key].saved;
              }
            }
            var img_compress = 0;
            if (optimize.img) {
              for (var key in optimize.img) {
                img_compress += optimize.img[key].saved;
              }
            }

            mod.css_compress = css_compress;
            mod.js_compress = js_compress;
            mod.img_compress = img_compress;
            mod.save();
          });
        }
      });

      /**
       * 编译组件, 图片暂时没有解析
       */
      fs.readFile(path.join(fileDes, 'data.json'), function(err, data) {
        if (err) {
          return;
        }

        var widgets = JSON.parse(data.toString());
        for(var key in widgets) {
          compileWidget(key, widgets[key]);
        }

        //拼凑组件页面

      });

      var template = '<!doctype html><html lang="zh-CN">' +
        '<head><meta charset="utf-8" /><title>{{title}}</title><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /><meta name="apple-mobile-web-app-capable" content="yes" /><meta name="apple-mobile-web-app-status-bar-style" content="black" /><meta name="format-detection" content="telephone=no" /><link rel="stylesheet" href="/' + appId + '/gb/output/css/gb.css"/>{{links}}</head>' +
          '<body ontouchstart><div class="mod_container">{{content}}</div><script src="/' + appId +'/gb/output/js/gb.js"></script>{{scripts}}</body>' +
        '</html>';
      var appPath = path.join(fileDes, '../');
      var gbPath = path.join(appPath, 'gb', 'output');
      function compileWidget(widgetName, info) {
        WidgetHelper.findOne({
          app: appId,
          name: widgetName,
          'module.name': {$ne: info.module}
        }).then(function(widget) {
          fs.readFile(path.join(appPath, info.module, '_', 'widget', widgetName, widgetName + '.html'), function(err, data) {
            if (err) {
              return;
            }

            var widgetTemplate = data.toString();
            widgetTemplate = widgetTemplate.replace('<% widget.scriptStart() %>', '');
            widgetTemplate = widgetTemplate.replace('<% widget.scriptEnd() %>', '');
            var compiled = templateBuilder(widgetTemplate);
            var widgetCompiled = template.replace('{{content}}', compiled(info.params[0])).replace('{{title}}', widgetName);
            var links = '<link rel="stylesheet" href="/'+ widget.app+ '/' + info.module + '/_/widget/' + widgetName + '/' + widgetName + '.css"/>';
            var scripts = '<script src="/' + appId + '/' + info.module + '/_/widget/' + widgetName + '/' + widgetName + '.js"></script>';
            widgetCompiled = widgetCompiled.replace('{{links}}', links).replace('{{scripts}}', scripts);
            fs.writeFile(path.join(appPath, info.module, '_', 'widget', widgetName, 'compile.html'), widgetCompiled, 'utf-8', function(err) {
              if (err) {
                return;
              }

              widget.preview = '/' + appId + '/' + info.module + '/_/widget/' + widgetName + '/compile.html';
              widget.save();
            });
          });
        });
      }
    });
  })]);
};
