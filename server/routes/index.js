/**
 * 路由控制
 *
 * @param {Object} app express对象
 */

var tools = require('./tools');
var client = require('./client');

module.exports = function(app) {
  /*
   * 开启CORS
   */
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.use('/api', tools);
  app.use('/client', client);
};
