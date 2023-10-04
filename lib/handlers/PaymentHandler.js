// Enforcing strict mode to catch common coding mistakes and "unsafe" actions such as defining global variables
"use strict";

// Importing configurations, potentially including sensitive data like API keys
const secretConfig = require("../../config");

// Importing the Stripe node module and initializing it with a secret key from the configuration
const stripe = require("stripe")(secretConfig.STRIPE_SECRET_KEY);

// Creating a Map to store item data, using item IDs as keys
const storeItems = new Map([
    [1, { priceInCents: 10000, name: "King Size Memory Foam Mattress" }],
    [2, { priceInCents: 20000, name: "Lounge Room Sofa" }],
]);

// Defining a class PaymentHandler to manage payment-related functionality
class PaymentHandler {

    // Static method to create a Stripe checkout session with provided items
    static async CreateCheckoutSession(storeItemsObj = []) {
        // Returning a new promise, which is either resolved with the session data or rejected with an error
        return new Promise(async (resolve, reject) => {
            try {
                // Creating a checkout session by calling the relevant Stripe API method
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card", "alipay", "zip"],  // Specifying accepted payment methods
                    mode: "payment",  // Setting the mode to "payment", indicating that this is a one-time payment
                    line_items: storeItemsObj.map(item => {  // Mapping provided item data to a format accepted by Stripe
                        // Retrieving item details from the predefined store items
                        const storeItem = storeItems.get(item.productId);
                        return {
                            price_data: {
                                currency: "aud",  // Specifying the currency to be used
                                product_data: {
                                    name: storeItem.name,  // Setting the name of the product
                                },
                                unit_amount: storeItem.priceInCents,  // Setting the price per unit in cents
                            },
                            quantity: item.quantity,  // Setting the quantity from provided item data
                        };
                    }),
                    success_url: `${secretConfig.CLIENT_URL}/success.html`,  // URL where users will be redirected upon successful payment
                    cancel_url: `${secretConfig.CLIENT_URL}/cancel.html`,    // URL where users will be redirected upon cancellation
                });
                // Resolving the promise with the created session data
                resolve(session);
            } catch (err) {
                // Rejecting the promise with the caught error
                reject(err);
            }
        });
    }
}

// Exporting the PaymentHandler class to be used in other modules
module.exports = PaymentHandler;