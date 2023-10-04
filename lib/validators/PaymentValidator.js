// Enforcing strict mode to catch common coding mistakes and "unsafe" actions such as defining global variables
"use strict";

// Importing the Joi validation library to validate JavaScript objects against predefined schemas
const Joi = require('joi');

// Importing a custom HTTP error class to create and throw custom errors
const CustomHttpError = require("../CustomHttpError");

// Importing configurations, potentially including logger configurations
const config = require("../config");

// Importing a logger and creating a logging instance with specific configurations
const logger = require("../logger");
const log = logger(config.logger);

// Defining a Joi validation schema for payments. 
// The schema expects an array of objects, each containing a productId and quantity, both of which are required numbers
const paymentCreateValidationSchema = Joi.array().items(Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
}));

// Defining a class PaymentValidator to manage payment-related validations
class PaymentValidator {

    // Static method to validate payment creation objects against the predefined schema
    static paymentCreateValidation(obj) {
        // Validating the provided object against the schema and destructuring the result into value and error
        const { value, error } = paymentCreateValidationSchema.validate(obj);

        // If there is a validation error, log the error and reject the promise with a custom HTTP error
        if (error) {
            log.error("Payment error:", error);
            return Promise.reject(new CustomHttpError(error.message, "400"));
        }

        // If validation is successful, resolve the promise with the validated value
        return Promise.resolve(value);
    }
}

// Exporting the PaymentValidator class to be used in other modules
module.exports = PaymentValidator;