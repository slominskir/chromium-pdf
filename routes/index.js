var pkgInfo = require('../package.json');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Puppet Show', version: pkgInfo.version});
});

module.exports = router;
