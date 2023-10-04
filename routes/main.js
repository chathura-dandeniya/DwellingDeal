var router = require('express').Router();


const Product = require('../models/product');
var getAllProducts = require('../controllers/productController');

router.get('/paymentHome', function (req, res) {
  res.render('main/paymentHome');
});

router.get('/', async (req,res) => {
  try{
    const products = await Product.find({});
    res.render('main/index', {
      productsList: products
    });
  }catch (err){
    console.error(err);
    res.status(500).send("Internal Server Error");
  }

});


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
