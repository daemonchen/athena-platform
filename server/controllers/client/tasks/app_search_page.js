var PageHelper = require('../../../helpers/page');

module.exports = function(appid, search) {
  var query = search;
  var mod;
  if (search.endsWith('.html')) {
    query = search.substring(0, search.lastIndexOf('.html'));
  }
  if (query.indexOf('/') === 0) {
    query = query.substring(1);
  }
  mod = query.split('/');

  return new Promise(function(resolve, reject) {
    var regex = new RegExp(mod[mod.length - 1], 'i');
    var params = {};
    var appName, modName;
    if (mod.length > 3) {
      return resolve([]);
    }

    params.app = appid;
    params.name = regex;
    if (mod.length === 3) {
      appName = mod[0];
      modName = mod[1];
    }

    if (mod.length === 2) {
      modName = mod[0];
    }

    PageHelper.findWithAllSub(params, modName, appName).then(function(pages) {
      if (pages.length === 0) {
        resolve(null);
      } else {
        resolve(pages);
      }
    }).catch(function(err) {
      reject(err);
    });
  });
}
