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
    fs.readFile(path.join(fileDes, 'module-conf.js'), function(err, data) {
      if (err) {
        reject(err);
      }

      resolve(eval(data.toString()));
    });
  })]);
};
