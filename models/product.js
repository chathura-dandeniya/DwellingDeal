const { timeStamp } = require('console');
const mongoose =require('mongoose');
const { MongoClient } = require('mongodb');
let client = require('../server');

const productSchema = mongoose.Schema({
    // product_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User"
    // },
    category: {
        type: String,
        required: [true, "Please add a category"],
    },
    title: {
        type: String,
        required: [true, "Please add a title"],
        text: true,
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        text: true,
    },
    price: {
        type: Number,
        required: [true, "Please add a price"]
    },
    location: {
        type: String,
        required: [true, "Please add a location"]
    },
    status: {
        type: String,
        default: "Available"
    },
    listing_date: {
        type: Date,
        default: Date.now
    }

});


// module.exports = {
//     Product: mongoose.model("Product", productSchema),
//   };
  

module.exports = mongoose.model("Product", productSchema)
