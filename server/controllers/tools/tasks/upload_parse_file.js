var fs = require('fs');
var path = require('path');

module.exports = function(fileDes) {
  return Promise.all([new Promise(function(resolve, reject) {
    fs.readFile(path.join(fileDes, 'map.json'), function(err, data) {
      if (err) {
        reject(err);
      }

      resolve(JSON.parse(data.toString()));
    });
  }), new Promise(function(resolve, reject) {
    fs.exists(path.join(fileDes, 'module-conf.js'), function(exists) {
      if (!exists) {
        return reject('module-conf.js was not existed');
      }

      var modConf = require(path.join(fileDes, 'module-conf.js'));
      resolve(modConf);
    });
  })]);
};
