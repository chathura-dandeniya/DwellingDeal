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
    searchProducts
} = require('../controllers/productController');

//tell router to use getProducts and addProduct on the route "/"
router.route('/').get(getProducts).post(addProduct);
router.route('/:query').get(searchProducts);
//tell router to use getProduct, updateProduct and deleteProduct with route "/:id"
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);


//export routes
module.exports = router;
