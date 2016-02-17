var express = require('express');
var router = express.Router();
var user = require('../controllers/client/user');
var command = require('../controllers/client/command');
var app = require('../controllers/client/app');
var template = require('../controllers/client/template');
var initApp = require('../controllers/client/initApp');
var widgets = require('../controllers/client/widgets');
var analysis = require('../controllers/client/analysis');

router.get('/commands', command.index);
router.get('/apps', app.index);
router.get('/app/desc', app.desc);
router.get('/app/search', app.search);
router.get('/templates', template.index);
router.get('/template/get', template.get);
router.get('/template/getContent', template.getContent);
router.get('/initApps', initApp.index);

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/template/add', template.add);
router.post('/template/update', template.update);
router.post('/app/update', app.update);

router.post('/initApp/add', initApp.add);

router.get('/widgets', widgets.index);
router.get('/analysis', analysis.index);

module.exports = router;
