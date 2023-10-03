// Enforcing strict mode to catch common coding mistakes and "unsafe" actions such as defining global variables
"use strict"

// Importing the express module and initializing a router
const express = require("express");
const router = express.Router();

// Importing custom modules for payment handling and validation
const PaymentHandler = require("../lib/handlers/PaymentHandler");
const PaymentValidator = require("../lib/validators/PaymentValidator");

// Exporting a function that returns the configured router
module.exports = () => {

    // Defining a route to handle POST requests to the '/create' endpoint
    router.post("/create", async (req, res) => {
        try {
            // Validating the request body using PaymentValidator and storing the result in storeItemsObj
            const storeItemsObj = await PaymentValidator.paymentCreateValidation(req.body);

            // Creating a checkout session using PaymentHandler and storing the result in session
            const session = await PaymentHandler.CreateCheckoutSession(storeItemsObj);

            // Sending a JSON response with the URL from the created session
            res.json({ url: session.url })
        } catch (err) {
            // Sending a 500 error response with the error message if something goes wrong
            return res.status(500).send({
                status: 500,
                error: err.message || "Could not create payment"
            })
        }
    });

    // Returning the configured router
    return router
}
