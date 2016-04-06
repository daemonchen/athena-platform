'use strict';
/**
 * 页面模型
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var PageSchema = new Schema({
  name: {type: String, require: true},
  createTime: {type: Date, default: Date.now},
  author: String, //暂时没有用户模块
  //author: {type: Schema.Types.ObjectId, ref: 'User'},
  app: {type: String, ref: 'App'},
  module: {type: String, ref: 'Mod'},
  widgets: [{type: Schema.Types.ObjectId, ref: 'Widget'}],
  fragment: String,
  js: [{type: Schema.Types.ObjectId, ref: 'Js'}],
  css: [{type: Schema.Types.ObjectId, ref: 'Css'}],
  image: [{type: Schema.Types.ObjectId, ref: 'Image'}]
});

PageSchema.plugin(lastMod);

PageSchema.pre('save', function(next) {
  this.widgets = this.widgets.filter(function(widget, index) {
    return this.widgets.indexOf(widget) === index;
  }.bind(this));

  this.css = this.css.filter(function(value, index) {
    return this.css.indexOf(value) === index;
  }.bind(this));

  this.js = this.js.filter(function(value, index) {
    return this.js.indexOf(value) === index;
  }.bind(this));

  this.image = this.image.filter(function(value, index) {
    return this.image.indexOf(value) === index;
  }.bind(this));

  next();
});

module.exports = mongoose.model('Page', PageSchema);
