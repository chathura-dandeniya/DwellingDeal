var router = require('express').Router();
const fetch = require('node-fetch'); // Import the 'node-fetch' library
const Product = require('../models/product');
var productRoutes = require('../controllers/productController');

// router.get('/paymentHome', function (req, res) {
//   res.render('main/paymentHome');
// });

router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const limit = 8;
  try {
    //find all products in DB, then load them into page with number
    const products = await Product.find({})
    //skip a page if the limit is exceeded
      .skip((page -1)* limit)
      //define limit variable as the limit
      .limit(limit);
    
    const totalProducts = await Product.countDocuments();
    const user = req.user;
    //check if a cart exists, if not create cart array
    if(!req.session.cart)
    {
      req.session.cart = [];
    }
    
    res.render('main/index', {
      productsList: products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts/limit),
      user: user,
      cart: req.session.cart
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

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

  res.render('main/cart',{
    cart: req.session.cart
  });
})

router.get('/product', function (req, res){
  res.render('main/product');
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