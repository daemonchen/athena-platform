'use strict';

/**
 * athena版本模型
 * athena版本控制，用于自动更新本地版本
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var VersionSchema = new Schema({
  version: String,
  createTime: {type: Date, default: Date.now}
});

VersionSchema.plugin(lastMod);

module.exports = mongoose.model('Version', VersionSchema);

