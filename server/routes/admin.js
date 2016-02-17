var express = require('express');
var router = express.Router();
var admin = require('../controllers/admin');

router.get('/', admin.index);
router.post('/delete', admin.delete);
router.get('/users', admin.users);
router.post('/user/delete', admin.deleteUser);

module.exports = router;
