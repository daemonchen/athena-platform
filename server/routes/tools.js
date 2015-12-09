var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var command = require('../controllers/tools/command');
var upload = require('../controllers/tools/upload');
var uploadConfig = require('../config/upload');
var template = require('../controllers/tools/template');
var app = require('../controllers/tools/app');

var uploadSetting = multer({
  dest: path.join(uploadConfig.path, 'source')
});

router.post('/commands', command.index);
router.post('/upload', [uploadSetting.single('athena'), upload.index]);

router.get('/template/download', template.download);
router.get('/templates', template.index);

router.get('/app/desc', app.desc);

module.exports = router;
