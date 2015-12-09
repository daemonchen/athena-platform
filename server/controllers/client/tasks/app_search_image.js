var ImageHelper = require('../../../helpers/image');

module.exports = function(appid, search) {
  var regex = new RegExp(search, 'i');

  return new Promise(function(resolve, reject) {
    ImageHelper.findWithSub({app: appid, name: regex}).then(function(images) {
      if (images.length === 0) {
        resolve(null);
      } else {
        resolve(images);
      }
    }).catch(function(err) {
      reject(err);
    });
  });
}
