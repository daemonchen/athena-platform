/**
 * 网页创建的项目数据表
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var InitAppSchema = new Schema({
  _id: String,
  name: {type: String, unique: true, index: true, require: true},
  createTime: {type: Date, default: Date.now},
  //author: {type: Schema.Types.ObjectId, ref: 'User'},
  author: String,
  template: {type: Schema.Types.ObjectId, ref: 'Template'},
  preview: Object,
  deploys: Object,
  initstatus: {type: Boolean, default: false}
});

InitAppSchema.plugin(lastMod);

module.exports = mongoose.model('InitApp', InitAppSchema);

