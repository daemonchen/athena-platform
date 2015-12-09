var PageHelper = require('../../../helpers/page');

module.exports = function(appid, search) {
  var regex = new RegExp(search, 'i');
  return new Promise(function(resolve, reject) {
    PageHelper.findWithMod({app: appid, fragment: regex}).then(function(page) {
      if (page.length === 0) {
        resolve(null);
      } else {
        resolve(page);
      }
    }).catch(function(err) {
      reject(err);
    });
  });
};
