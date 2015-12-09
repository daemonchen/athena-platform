var AdmZip = require('adm-zip');
var fs = require('fs');

module.exports = function(fileSource, fileDes) {
  var zip = new AdmZip(fileSource);

  zip.extractAllTo(fileDes, true);

  return new Promise(function(resolve, reject) {
    fs.exists(fileDes, function(exists) {
      if (!exists) {
        reject('failed unzip');
      }

      resolve(true);
    });
  });
};
