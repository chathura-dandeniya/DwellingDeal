const asyncHandler = require('express-async-handler');

//import product model
const Product = require('../models/product');

//@desc Get all products
//@route GET /api/products/
//@access public
const getProducts = asyncHandler(async(res,req)=>{
    const productName = req.params.title;
    const products = await Product.find();
    if(product === null) {
        res.status(404).json(product);
        console.log("Products not found")
    }
    //return product as json
    res.status(200).json(product)
})

//@desc Add a product
//@route POST /api/products/
//@access public
const addProduct = asyncHandler(async(req, res)=>{
    const product = {product_id, user_id, category, title, description, price, location, status, listing_date} = req.body;
    if( !product_id ||  !user_id || !category || !title || !description || !price || !location || !status || !listing_date ) {
        res.status(400);
        throw new Error("All fields are mandatory");
    };
    //attempt to find existing product based on product id
    const productAvailable = await product.findOne({product_id});
    if(productAvailable){
        res.status(400);
        throw new Error("Product already listed");
    };

    console.log(`Product listing created; ID:${product_id}, title ${title}`);
    if(product) {
        res.status(201).json({_id: product.id, title: product.title, })
    }
    else{
        res.status(400);
        throw new Error("Product data is not valid");
    }
});

//@desc Get a product
//@route Get /api/products/:id
//@access public
const getProduct = asyncHandler(async(res,req)=>{
    const product = await Product.findById(req.params.id);
    if(product === nulll) {
        res.status(404).json(product);
        console.log("Product not found")
    }
    //return product as json
    res.status(200).json(product)
})

//@desc Update a product
//@route PUT /api/products/:id
//@access public
const updateProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404).json(product);
        throw new Error("Product not found")
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

});

//@desc Delete a product
//@route DELETE /api/products/:id
//@access public
const deleteProduct = asyncHandler(async (req, res) => {

    try{
        const product = await Product.findById(req.params.id);
    
    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    await Product.deleteOne(contact);

    res.status(200).json({ message: `Delete product for ${req.params.id}` });
    }catch(err){
        console.log(err);
    }
});

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
};