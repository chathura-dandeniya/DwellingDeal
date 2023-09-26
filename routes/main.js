var router = require('express').Router();

router.get('/paymentHome', function (req, res) {
  res.render('main/paymentHome');
});

router.get('/', function (req,res) {
  res.render('main/index');
})


router.get('/about', function (req, res) {
  res.render('main/about');
});

module.exports = router;
