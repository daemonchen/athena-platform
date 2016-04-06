var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommandSchema = new Schema({
  cmd: String,
  args: Array,
  createTime: {type: Date, default: Date.now},
  app: {type: String, ref: 'App'},
  module: {type: String, ref: 'Mod'},
  //modules: [{type: String, ref: 'Mod'}],
  author: String //暂时没有用户模块
  //author: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Command', CommandSchema);
