var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var ModSchema = new Schema({
  _id: String,
  name: String,
  createTime: {type: Date, default: Date.now},
  author: String, //暂时没有用户模块
  //author: {type: Schema.Types.ObjectId, ref: 'User'},
  app: {type: String, ref: 'App'},
  pages: [{type: Schema.Types.ObjectId, ref: 'Page'}],
  widgets: [{type: Schema.Types.ObjectId, ref: 'Widget'}]
});

ModSchema.plugin(lastMod);

ModSchema.pre('save', function(next) {
  this.pages = this.pages.filter(function(page, index) {
    return this.pages.indexOf(page) === index;
  }.bind(this));

  this.widgets = this.widgets.filter(function(widget, index) {
    return this.widgets.indexOf(widget) === index;
  }.bind(this));

  next();
});

module.exports = mongoose.model('Mod', ModSchema);
