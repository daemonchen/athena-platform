'use strict';
/**
 * css表，存储css相关信息
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var CssSchema = new Schema({
  name: {type: String, require: true},
  createTime: {type: Date, default: Date.now},
  app: {type: String, ref: 'App'},
  module: {type: String, ref: 'Mod'},
  loadedBy: [{type: Schema.Types.ObjectId, ref: 'Page'}],
  revision: String,
  images: [{type: Schema.Types.ObjectId, ref: 'Image'}]
});

CssSchema.plugin(lastMod);

CssSchema.pre('save', function(next) {
  this.loadedBy = this.loadedBy.filter(function(page, index) {
    return this.loadedBy.indexOf(page) === index;
  }.bind(this));

  this.images = this.images.filter(function(image, index) {
    return this.images.indexOf(image) === index;
  }.bind(this));

  next();
});

module.exports = mongoose.model('Css', CssSchema);
