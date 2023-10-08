const express = require('express')
//import router
var router = express.Router();

//import productController
const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    removeFromCart,
} = require('../controllers/productController');

//tell router to use getProducts and addProduct on the route "/"
router.route('/').get(getProducts).post(addProduct);
router.route('/cart').post(addToCart);
router.route('/cart/remove_item').get(removeFromCart);
//tell router to use getProduct, updateProduct and deleteProduct with route "/:id"
router.route('/:term').get(getProduct).put(updateProduct).delete(deleteProduct);


router.get('/paymentLogin', function (req, res) {
    res.render('accounts/paymentLogin');
  });


//export routes
module.exports = router;
