'use strict';
/**
 * js表模型
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var JsSchema = new Schema({
  name: {type: String, require: true},
  createTime: {type: Date, default: Date.now},
  revision: String,
  loadedBy: [{type: Schema.Types.ObjectId, ref: 'Page'}],
  app: {type: String, ref: 'App'},
  module: {type: String, ref: 'Mod'}
});

JsSchema.plugin(lastMod);

module.exports = mongoose.model('Js', JsSchema);
