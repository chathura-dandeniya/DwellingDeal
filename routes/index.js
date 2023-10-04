var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'DwellingDeal Payment Service', message: 'Welcome to DwellingDeal Payment Service API!' });
});

module.exports = router;
