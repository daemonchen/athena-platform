'use strict';
/**
 * 项目数据表
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var AppSchema = new Schema({
  _id: String,
  name: {type: String, unique: true, index: true, require: true},
  createTime: {type: Date, default: Date.now},
  author: String, //暂时没有用户模块
  //author: {type: Schema.Types.ObjectId, ref: 'User'},
  modules: [{type: String, ref: 'Mod'}],
  preview: {type: String, default: ''},
  template: {type: Schema.Types.ObjectId, ref: 'Template'},
  members: [{type: String}]
});

AppSchema.plugin(lastMod);

AppSchema.pre('save', function(next) {
  this.modules = this.modules.filter(function(mod, index) {
    return this.modules.indexOf(mod) === index;
  }.bind(this));

  this.members = this.members.map(function(member) {
    return member.trim();
  });

  if (this.members.length === 0 || this.members.indexOf(this.author) === -1) {
    this.members.push(this.author);
  }

  this.members = this.members.filter(function(member ,index) {
    return this.members.indexOf(member) === index;
  }.bind(this));

  next();
});

module.exports = mongoose.model('App', AppSchema);
