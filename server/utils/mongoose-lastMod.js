/**
 * mongoose-lastmod
 * 最后修改时间插件
 */
module.exports = function lastModifiedPlugin (schema) {
  schema.add({lastMod: Date})

  schema.pre('save', function (next) {
    this.lastMod = Date.now();
    next();
  })
};
