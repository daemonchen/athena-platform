'use strict';
/**
 * 模板模型
 * 用于记录模板添加纪录以及更新记录
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var TemplateSchema = new Schema({
  name: {type: String, unique: true},
  //author: String, //暂时没有用户模块
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  createTime: {type: String, default: Date.now},
  modify: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

TemplateSchema.plugin(lastMod);

module.exports = mongoose.model('Template', TemplateSchema);
