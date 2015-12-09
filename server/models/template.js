var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var TemplateSchema = new Schema({
  name: {type: String, unique: true},
  //author: String, //暂时没有用户模块
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  createTime: {type: String, default: Date.now}
});

TemplateSchema.plugin(lastMod);

module.exports = mongoose.model('Template', TemplateSchema);
