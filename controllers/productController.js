const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose')

//import product model
const Product = require('../models/product');
// const product = require('../models/product');

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
//@route Get /api/products/:term
//@access public
const getProduct = asyncHandler(async (req, res) => {
    console.log(req.params.term);
    try {
        let x = req.params.term;

        if (mongoose.Types.ObjectId.isValid(x)) {
            let product = await Product.findById(x);
            if (!product) {
                res.status(404).json(product);
            }

            // res.render('/main/index', {
            //     productsList: [], 
            //     currentPage: page, 
            //     totalPages: Math.ceil(totalProducts / limit), 
            //     user: user,
            //     cart: req.session.cart,
            // });
            res.json([product]);
        } else {
            const query = await { $text: { $search: x } };
            const projection = {
                _id: 0,
                score: { $meta: "textScore" },
            };
            const products = await Product.find(query, projection).sort({ score: { $meta: "textScore" } });

            if (products.length > 0) {
                console.log(products);
                res.status(200).json(products);
            } else {
                // Handle the case when no products match the search term
                res.status(404).json({ message: "No products found for the search term." });
            }
        }
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});


// const searchProducts = asyncHandler(async (req,res)=>{
//     try{
//         Product.find({$or:[{title:{'$regex':req.query.dsearch}},{description:{'$regex':req.query.dsearch}}]},(err,data)=>{
//             if(err){
//                 console.log(err);
//             }else{
//                 res.render('main/index', {data: data});
//             }
//         })
//     }catch (error){
//         console.log(error);
//     }
// })

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
    removeFromCart,
};