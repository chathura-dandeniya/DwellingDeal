// Enforcing strict mode to catch common coding mistakes and "unsafe" actions such as defining global variables
'use strict';

// Defining a class CustomHttpError that extends the built-in Error class
class CustomHttpError extends Error {
    // Constructor takes two parameters: the error message and an HTTP status code
    constructor(message, statusCode) {
        // Calling the constructor of the parent Error class with the provided message
        super(message);

        // Assigning the provided HTTP status code to a property named 'status'
        this.status = statusCode;
    }
}
// Exporting the CustomHttpError class to be used in other modules
module.exports = CustomHttpError;
