'use strict';

var PageHelper = require('../../../helpers/page');
var CssHelper = require('../../../helpers/css');
var JsHelper = require('../../../helpers/js');
var ImageHelper = require('../../../helpers/image');

module.exports = function(mod, app, gb, includes) {
  var promises = [];
  var moduleId = mod._id;

  function updatePage(page, rely) {
    return new Promise(function(resolve, reject) {
      PageHelper.findOne({module: moduleId, name: page.replace('.html', '')}).then(function(page) {
        page.fragment = '/sinclude/cssi/fd/h5/' + app.name + '/' + mod.name + '/' + page.name + '.shtml';
        page.save();
        return Promise.all([
          parseCss(page, rely.css),
          parseJs(page, rely.js),
          parseImage(page, rely.images)
        ]);
      }).then(function(parses) {
        console.log(parses);
        resolve(parses);
      }).catch(function(err) {
        console.log(err);
        reject(err);
      });
    });
  }

  function parseCss(page, css) {
    return new Promise(function(resolve, reject) {
      Promise.all(css.map(function(cssInfo) {
        return updateCss(cssInfo, page);
      })).then(function(cssId) {
        var diff = [];
        var included = false;

        page.css.forEach(function(cssInfo) {
          included = false;
          cssId.forEach(function(id){
            if ('' + cssInfo === '' + id) {
              included = true;
            }
          });

          if (!included) {
            diff.push(cssInfo);
          }
        });
        page.css = cssId;
        page.save();
        //删除css依赖
        deletePageCssRely(diff, page);
        resolve(cssId);
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  function deletePageCssRely(diff, page) {
    diff.forEach(function(css) {
      CssHelper.findOne({_id: css}).then(function(css) {
        if (css.loadedBy.indexOf(page._id) !== -1) {
          css.loadedBy.splice(css.loadedBy.indexOf(page._id), 1);
          css.save();
        }
      });
    });
  }

  function updateCss(cssInfo, page) {
    return new Promise(function(resolve, reject) {
      var modId = moduleId;
      if (cssInfo.module === 'gb') {
        modId = gb._id;
      }
      if (cssInfo.images && cssInfo.images.length > 0) {//处理图片
        Promise.all(cssInfo.images.map(function(img) {
          var modId = moduleId;
          if (img.module === 'gb') {
            modId = gb._id;
          }
          return ImageHelper.findOne({
            name: img.module + '/' + img.res,
            module: modId
          });
        })).then(function(imgs) {
          var imgLoaded = [];
          imgs.forEach(function(img) {
            imgLoaded.push(img._id);
          });
          CssHelper.findOne({
            name: cssInfo.name,
            module: modId
          }).then(function(css) {
            var deleteImgRely = [];
            var included = false;
            css.images.forEach(function(img) {
              included = false;
              imgs.forEach(function(imgRecord) {
                if ('' + img === '' + imgRecord._id) {
                  included = true;
                }
              });

              if (!included) {
                deleteImgRely.push(img);
              }
            });

            css.loadedBy.push(page._id);
            css.images = imgLoaded;
            css.save();
            //更新图片依赖
            imgs.forEach(function(img) {
              img.loadedByCss.push(css._id);
              img.save();
            });
            //删除依赖
            return deleteCssImgRely(deleteImgRely, css);
          }).then(function(css) {
            resolve(css._id);
          }).catch(function(err) {
            reject(err);
          });
        }).catch(function(err) {
          reject(err);
        });

      } else {
        CssHelper.findOne({
          module: modId,
          name: cssInfo.name
        }).then(function(css) {
          css.loadedBy.push(page._id);
          css.save();
          return deleteCssImgRely(css.images, css);
        }).then(function(css) {
          resolve(css._id);
        }).catch(function(err) {
          reject(err);
        });
      }
    });
  }

  function deleteCssImgRely(diff, css) {
    return new Promise(function(resolve, reject) {
      Promise.all(diff.map(function(img) {
        return ImageHelper.findOne({
          _id: img
        });
      })).then(function(imgs) {
        imgs.forEach(function(img) {
          if (img) {
            img.loadedByCss.splice(img.loadedByCss.indexOf(css._id), 1);
            img.save();
          }
        });
        resolve(css);
      }).catch(function(err) {
        reject(err);
      })
    });
  }

  function parseJs(page, js) {
    return new Promise(function(resolve, reject) {
      Promise.all(js.map(function(jsInfo) {
        return updateJs(page, jsInfo);
      })).then(function(js) {
        var diff = [];
        var included = false;

        page.js.forEach(function(pJs) {
          included = false;
          for (var key in js) {
            if ('' + pJs === '' + js[key]) {
              included = true;
              break;
            }
          }
          if (!included) {
            diff.push(pJs);
          }
        });
        page.js = js;
        page.save();

        deletePageJsRely(diff, page);
        resolve(js);
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  function deletePageJsRely(diff, page) {
    diff.forEach(function(js) {
      JsHelper.findOne({
        _id: js
      }).then(function(js) {
        if (js.loadedBy.indexOf(page._id) !== -1) {
          js.loadedBy.splice(js.loadedBy.indexOf(page._id), 1);
          js.save();
        }
      }).catch(function(err) {
      });
    });
  }

  function updateJs(page, js) {
    return new Promise(function(resolve, reject) {
      var modId = moduleId;

      if (js.module === 'gb') {
        modId = gb._id;
      }

      return JsHelper.findOne({
        name: js.name,
        module: modId
      }).then(function(js) {
        if (js) {
          if (js.loadedBy.indexOf(page._id) === -1) {
            js.loadedBy.push(page._id);
            js.save(function(err) {
              console.log(err);
            });
          }
          resolve(js._id);
        } else {
          reject('js was not found');
        }
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  /**
   * 解析页面图片
   */
  function parseImage(page, images) {
    return new Promise(function(resolve, reject) {
      Promise.all(images.map(function(image) {
        return updateImage(page, image);
      })).then(function(imgs) {
        var diff = [];
        var included = false;
        page.image.forEach(function(img) {
          included = false;
          for (var key in imgs) {
            if ('' + imgs[key] === '' + img) {
              included = true;
            }
          }
          if (!included) {
            diff.push(img);
          }
        });

        page.image = imgs;
        page.save();
        deletePageImgRely(diff, page);
        resolve(imgs);
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  function deletePageImgRely(diff, page) {
    diff.forEach(function(img) {
      ImageHelper.findOne({_id: img}).then(function(img) {
        if (img.loadedByPage.indexOf(page._id)) {
          img.loadedByPage.splice(img.loadedByPage.indexOf(page._id), 1);
          img.save();
        }
      });
    });
  }

  function updateImage(page, image) {
    var modId = moduleId;
    if (image.module === 'gb') {
      modId = gb._id;
    }
    return new Promise(function(resolve, reject) {
      ImageHelper.findOne({
        name: image.module + '/' + image.res,
        module: modId
      }).then(function(img) {
        if (img) {
          if (img.loadedByPage.indexOf(page._id) === -1) {
            img.loadedByPage = img.loadedByPage.push(page._id);
            img.save();
          }

          resolve(img._id);
        } else {
          reject('image cannot be found');
        }
      }).catch(function(err) {
        reject(err);
      })
    });
  }

  for (var page in includes) {
    promises.push(updatePage(page, includes[page]));
  }

  return Promise.all(promises);
};
