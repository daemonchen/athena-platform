var WidgetHelper = require('../../helpers/widget');
var ModHelper = require('../../helpers/mod');
var handler = require('../../utils/handler');
var code = require('../../utils/code');

/**
 * 获取模块中的组件
 */
exports.index = function(req, res) {
  var mod = req.query.mod;

  if (mod) {
    ModHelper.findOne({_id: mod}).then(function(mod) {
      WidgetHelper.find({module: mod._id, preview: {$ne: ''}}).then(function(widgets) {
        var data = {
          mod: mod.name,
          widgets: widgets
        };
        handler.send(res, code.SUCCESS, data);
      });
    }).catch(function(err) {
      console.log(err);
      handler.handleError(res, code.FAILURE, 'mod cannot be empty');
    });
  } else {
    handler.handleError(res, code.FAILURE, 'mod cannot be empty');
  }
};
