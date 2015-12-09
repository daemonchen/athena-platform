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
  template: {type: Schema.Types.ObjectId, ref: 'Template'}
});

AppSchema.plugin(lastMod);

AppSchema.pre('save', function(next) {
  this.modules = this.modules.filter(function(mod, index) {
    return this.modules.indexOf(mod) === index;
  }.bind(this));

  next();
});

module.exports = mongoose.model('App', AppSchema);
