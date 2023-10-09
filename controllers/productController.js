const asyncHandler = require('express-async-handler');
const multer = require('multer');

//import product model
const Product = require('../models/product');
// const product = require('../models/product');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    const {category, title, description, price, location} = req.body;
    if( !category || !title || !description || !price || !location) {
        res.status(400);
        throw new Error("All fields are mandatory");
    };
    //attempt to find existing product based on product id
    const productAvailable = await Product.findOne({ title });
    if(productAvailable){
        res.status(400);
        console.log(productAvailable);
        throw new Error("Product already listed");
    };
    try{
        // const imageBuffer = req.file.buffer;

        const product = await Product.create({
            category, 
            title,
            description,
            price,
            location,
            // image: {
            //     data: imageBuffer,
            //     contentType: req.file.mimetype,
            // },
        });
        await product.save();
        res.status(201).json(product);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Error adding product'});
    }
    
});

//@desc Get a product
//@route Get /api/products/:term
//@access public
const getProduct = asyncHandler(async (req, res) => {
    console.log(req.params.term);
    const page = req.query.page || 1;
    const limit = 8;

    try {
        let x = req.params.term;
        const query = { $text: { $search: x } };
        const projection = {
            _id: 0,
            score: { $meta: "textScore" },
        };

        // Count all matching documents for pagination
        const totalProducts = await Product.countDocuments(query);

        // Find and paginate the products
        const products = await Product.find(query, projection)
            .sort({ score: { $meta: "textScore" } })
            .skip((page - 1) * limit)
            .limit(limit);

        const user = req.user;
        if (!req.session.cart) {
            req.session.cart = [];
        }

        if (products.length > 0) {
            console.log("searching all products for match");
            res.render('main/results', {
                productsList: products,
                currentPage: page,
                totalPages: Math.ceil(totalProducts / limit),
                user: user,
                cart: req.session.cart,
            });
        } else {
            console.log("searching by ID");
            let product = await Product.findById(x);
            if (!product) {
                res.status(404).json(product);
            } else {
                res.status(200).json(product);
            }
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

//@desc add a product to cart
//@route PUT /api/products/cart
//@access private
const addToCart = asyncHandler(async (req, res) => {
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const product_price = parseFloat(req.body.product_price); 

    let count = 0;
    let cart = req.session.cart;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id === product_id) {
            cart[i].quantity += 1;
            count++;
            break;
        }
    }
    
    if (count === 0) {
        const cart_data = {
            product_id: product_id,
            product_name: product_name,
            product_price: parseFloat(product_price),
            quantity: 1
        };
        console.log(cart_data);
        cart.push(cart_data);
    }

    res.redirect('/');
});


//@desc remove a product from cart
//@route PUT /api/products/cart/removeFromCart
//@access private
const removeFromCart = asyncHandler(async(req,res)=>{
    console.log("Removing Item from cart")
    const product_id = req.query.id;
    let cart = req.session.cart;
    try{
        for(let i = 0; i <cart.length; i++){
            if(cart[i].product_id === product_id){
                cart.splice(i, 1);
            }
        }
        const referer = req.header('Referer');
        if(referer) {
            res.redirect(referer);
        }
        else {
            res.render('/')
        }
    }
    catch(err){
        console.log(product_id);
        throw new Error(err);
    }
});



//@desc Update a product
//@route PUT /api/products/:id
//@access public
const updateProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.term);
    if(!product) {
        res.status(404).json(product);
        throw new Error("Product not found")
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.term,
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
        console.log(req.params.term);
        const product = await Product.findById(req.params.term);
    if(!product) {
        res.status(404);
        console.log(req.params.term);
        throw new Error("Product not found");
    }
    await Product.deleteOne({ _id: req.params.term});

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
    addToCart,
    removeFromCart
};