var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var path = require('path');
var log4js = require('log4js');
var app = express();

//routes
var routes = require('./routes');

//load config
var cookieConfig = require('./config/cookie');
var mongoConfig = require('./config/mongo');

var env = app.get('env');
var port = process.env.PORT || 9000;

log4js.configure(require('./config/log4js.json'));
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//If enabled, be sure to use express.session() before passport.session()
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'athena-manage',
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    db: 'athena-manage'
  }),
  cookie: cookieConfig
}));

//mongoose connect
mongoose.connect(mongoConfig.uri, mongoConfig.options);
mongoose.connection.on('error', console.log);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static', 'unzip')));

routes(app);

var appLog = log4js.getLogger('app');

app.listen(port, function(err) {
  if (err) {
    appLog.error(err);
    return;
  }

  appLog.info('Listening on http://localhost:' + port);
});
