var handler = require('../../utils/handler');
var code = require('../../utils/code');
var AppHelper = require('../../helpers/app');
var ModHelper = require('../../helpers/mod');
var WidgetHelper = require('../../helpers/widget');
var PageHelper = require('../../helpers/page');

exports.index = function(req, res) {
  /**
   * app 总数
   */
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Promise.all([
    AppHelper.count({}),
    AppHelper.count({createTime: {$gt: today}}),
    ModHelper.count({}),
    ModHelper.count({createTime: {$gt: today}}),
    PageHelper.count({}),
    PageHelper.count({createTime: {$gt: today}}),
    WidgetHelper.count({}),
    WidgetHelper.count({createTime: {$gt: today}}),
    ModHelper.findAll(),
    ModHelper.findAll({lastMod: {$gt: today}})
  ]).then(function(ret) {
    var data = {};

    var total_css = 0, total_js = 0, total_img = 0;
    ret[8].forEach(function(mod) {
      total_css += mod.css_compress ? mod.css_compress : 0;
      total_js += mod.js_compress ? mod.js_compress : 0;
      total_img += mod.img_compress ? mod.img_compress : 0;
    });

    var today_css = 0, today_js = 0, today_img = 0;
    ret[9].forEach(function(mod) {
      today_css += mod.css_compress ? mod.css_compress : 0;
      today_js += mod.js_compress ? mod.js_compress : 0;
      today_img += mod.img_compress ? mod.img_compress : 0;
    });

    data.todayIncrease = [ret[1], ret[3], ret[5], ret[7]];
    data.todayCompress = [
      {value: today_js, name: 'js'},
      {value: today_css, name: 'css'},
      {value: today_img, name: 'image'}
    ];
    data.total = [ret[0], ret[2], ret[4], ret[6]];
    data.totalCompress = [
      {value: total_js, name: 'js'},
      {value: total_css, name: 'css'},
      {value: total_img, name: 'image'}
    ];
    handler.send(res, code.SUCCESS, data);
  }).catch(function(err) {
    console.log(err);
    handler.handleError(res, code.FAILURE, err);
  })
};
