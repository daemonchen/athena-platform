/**
 * mongod配置文件
 */
module.exports = {
  uri: 'mongodb://localhost/athena-manage',
  options: {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  }
};
