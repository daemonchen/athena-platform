var fs = require('fs');
var path = require('path');
var ModHelper = require('../../../helpers/mod');

module.exports = function(fileDes) {
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
    });
  })]);
};
