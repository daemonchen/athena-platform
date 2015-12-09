'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var ImageSchema = new Schema({
  name: {type: String, require: true},
  app: {type: String, ref: 'App'},
  module: {type: String, ref: 'Mod'},
  createTime: {type: Date, ref: Date.now},
  loadedByPage: [{type: Schema.Types.ObjectId, ref: 'Page'}],
  loadedByCss: [{type: Schema.Types.ObjectId, ref: 'Css'}],
  revision: String
});

ImageSchema.plugin(lastMod);

ImageSchema.pre('save', function(next) {
  this.loadedByCss = this.loadedByCss.filter(function(css, index) {
    return this.loadedByCss.indexOf(css) === index;
  }.bind(this));

  this.loadedByPage = this.loadedByPage.filter(function(page, index) {
    return this.loadedByPage.indexOf(page) === index;
  });

  next();
});

module.exports = mongoose.model('Image', ImageSchema);
