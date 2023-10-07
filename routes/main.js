var router = require('express').Router();

const Product = require('../models/product');
var productRoutes = require('../controllers/productController');

// router.get('/paymentHome', function (req, res) {
//   res.render('main/paymentHome');
// });

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    const user = req.user;
    res.render('main/index', {
      productsList: products,
      user: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/searchResults', async (req, res) => {
  try {
    const params = new URLSearchParams(window.location.search);
    const products = await productRoutes.getProducts({ params });
    res.render('main/results', {
      productsList: products
    });
    if (!products) {
      res.status(404).send("No Products Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
})


router.get('/about', function (req, res) {
  res.render('main/about');
});

router.get('/login', function (req, res) {
  res.render('main/login');
})

router.get('/register', function (req, res) {
  res.render('main/register');
})

router.get('/cart', function (req, res) {
  res.render('main/cart');
})

router.get('/checkout', function (req, res) {
  res.render('main/checkout');
})

router.get('/register', function (req, res) {
  res.render('main/register');
})

router.get('/cancel', function (req, res) {
  res.render('main/cancel');
})

router.get('/success', function (req, res) {
  res.render('main/success');
})


router.get('/productDetail', function (req, res) {
  res.render('main/productDetail');
})

module.exports = router;