'use strict';
/**
 * 线上版本解析任务
 */
var CssHelper = require('../../../helpers/css');
var JsHelper = require('../../../helpers/js');
var ImageHelper = require('../../../helpers/image');

module.exports = function(modInfo, rev) {
  function parseCss(css) {
    var promises = [];
    for (var cssInfo in css) {
      promises.push(dealCss(cssInfo, css[cssInfo]));
    }

    return Promise.all(promises);
  }

  function dealCss(cssInfo, css) {
    return new Promise(function(resolve, reject) {
      CssHelper.findOne({
        name: cssInfo,
        module: modInfo._id
      }).then(function(cssRecord) {
        if (cssRecord) {
          cssRecord.revision = css;
          cssRecord.save(function(err) {
            if (err) {
              reject(err);
            }

            resolve(cssRecord);
          });
        } else {
          CssHelper.create({
            name: cssInfo,
            revision: css,
            app: modInfo.app,
            module: modInfo._id
          }).then(function(cssRecord) {
            resolve(cssRecord);
          }).catch(function(err) {
            reject(err);
          });
        }
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  function parseJs(js) {
    var promises = [];

    for (var jsInfo in js) {
      promises.push(dealJs(jsInfo, js[jsInfo]));
    }

    return Promise.all(promises);
  }

  function dealJs(jsInfo, js) {
    return new Promise(function(resolve, reject) {
      JsHelper.findOne({name: jsInfo, module: modInfo._id}).then(function(jsRecord) {
        if (jsRecord) {
          jsRecord.revision = js;
          jsRecord.save(function(err) {
            if (err) {
              reject(err);
            }

            resolve(jsRecord);
          });
        } else {
          JsHelper.create({
            name: jsInfo,
            revision: js,
            app: modInfo.app,
            module: modInfo._id
          }).then(function(jsRecord) {
            resolve(jsRecord);
          }).catch(function(err) {
            reject(err);
          });
        }

      }).catch(function(err) {
        reject(err);
      });
    });
  }

  function parseImg(img) {
    var promises = [];

    for (var imgInfo in img) {
      promises.push(dealImg(imgInfo, img[imgInfo]));
    }

    return Promise.all(promises);
  }

  function dealImg(imgInfo, img) {
    return new Promise(function(resolve, reject) {
      ImageHelper.findOne({name: modInfo.name + '/images/' + imgInfo, module: modInfo._id}).then(function(imgRecord) {
        if (imgRecord) {
          imgRecord.revision = img;
          imgRecord.save(function(err) {
            if (err) {
              reject(err);
            }

            resolve(imgRecord);
          });
        } else {
          ImageHelper.create({
            name: modInfo.name + '/images/' + imgInfo,
            revision: img,
            app: modInfo.app,
            module: modInfo._id
          }).then(function(imgInfo) {
            resolve(imgInfo);
          }).catch(function(err) {
            reject(err);
          });
        }
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  return Promise.all([
    parseCss(rev.css),
    parseJs(rev.js),
    parseImg(rev.img)
  ]);
};
