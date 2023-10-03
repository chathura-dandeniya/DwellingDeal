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

router.get('/login', function(req, res){
  res.render('main/login');
})

router.get('/register', function(req,res){
  res.render('main/register');
})

router.get('/cart', function(req,res){
  res.render('main/cart');
})

router.get('/checkout', function(req,res){
  res.render('main/checkout');
})

router.get('/register', function(req,res){
  res.render('main/register');
})

router.get('/productDetail', function(req,res){
  res.render('main/productDetail');
})



module.exports = router;
