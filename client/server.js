var express = require('express');
var webpack = require('webpack');
var app = express();
var config = require('./webpack.config');
var path = require('path');

var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}));

app.use(require("webpack-hot-middleware")(compiler));

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + port);
});

