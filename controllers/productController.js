const asyncHandler = require('express-async-handler');

//import product model
const Product = require('../models/product');

//@desc Get all products
//@route GET /api/products/
//@access public
const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find();
    if(products === null) {
        res.status(404);
        console.log("Products not found")
    }
    //return product as json
    res.status(200).json(products);
});

//@desc Add a product
//@route POST /api/products/
//@access public
const addProduct = asyncHandler(async(req, res)=>{
    const { category, title, description, price, location} = req.body;
    if( !category || !title || !description || !price || !location) {
        res.status(400);
        throw new Error("All fields are mandatory");
    };
    // //attempt to find existing product based on product id
    // const productAvailable = await Product.findOne({product});
    // if(productAvailable){
    //     res.status(400);
    //     throw new Error("Product already listed");
    // };
    const product = await Product.create({
        category, 
        title,
        description,
        price,
        location
    })
    res.status(201).json(product);
});

//@desc Get a product
//@route Get /api/products/:id
//@access public
const getProduct = asyncHandler(async(req,res)=>{
    console.log(req.params.term);
    try{
        let x = req.params.term;
            const query = await {$text: { $search: x}};
            const projection = {
                _id: 0,
                score: {$meta: "textScore"},
            };
            const products = await Product.find(query, projection).sort({ score: {$meta: "textScore"} });
        if(products.length > 0){
            res.status(200).json(products)
        }
        else{

            let product = await Product.findById(x);
            if(!product) {
                res.status(404).json(product);
                throw new Error("Product not found")
            }
            //return product as json
            res.status(200).json(product)
        }
    }catch{
        res.status(404);
        throw new Error("Product not found")
    }
    
    
});


//@desc Search all products
//@route get /api/products/:term
//@access public
const searchProducts = asyncHandler(async(req,res)=>{
    console.log(req.params.term);
    try{
        const searchTerm = req.params.searchTerm;
        console.log(searchTerm)
        await Product.createIndexes({ title: "text"});

        const query = await {$text: { $search: searchTerm}};
        const projection = {
            _id: 0,
            score: {$meta: "textScore"},
        };
        const products = await Product.find(query, projection).sort({ score: {$meta: "textScore"} });

        if (products.length === 0) {
            res.status(404);
            throw new Error("No matches found");
        }else {
            res.status(200).json(products);
        }
    }catch (err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error"});
    }

});

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
    res.status(200).json(updatedProduct);
});

//@desc Delete a product
//@route DELETE /api/products/:id
//@access public
const deleteProduct = asyncHandler(async (req, res) => {

    try{
        console.log(req.params.id);
        const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    await Product.deleteOne({ _id: req.params.id});

    res.status(200).json({ message: `Deleted ${product}` });
    }catch(err){
        res.status(500);
    }
});

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
};