// Enforcing strict mode to catch common coding mistakes and "unsafe" actions such as defining global variables
'use strict';

// Importing configurations from different paths
const config = require('../../config');  // General configurations
const secretConfig = require('./../../../config');  // Potentially sensitive configurations like database URLs

// Importing a logger and creating a logging instance with specific configurations
const logger = require('../../logger');
const log = logger(config.logger);

// Importing Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment
const mongoose = require('mongoose');

// Declaring a variable to store the primary MongoDB connection
let primaryConn;

// Defining a class MongooseConnector to manage MongoDB connections
class MongooseConnector {

    // Static method to initialize the primary MongoDB connection
    static async initializePrimary() {
        try {
            // Getting the default connection object and attaching error and open event listeners
            primaryConn = mongoose.connection;
            primaryConn.on('error', () => {
                log.error('mongodb primary connection error');
            });
            primaryConn.once('open', () => {
                log.info('mongodb primary connected');
            });

            // Disabling strict query to allow querying by fields that are not present in the schema
            mongoose.set('strictQuery', false);

            // Connecting to MongoDB using the URL from secretConfig and returning the connection promise
            // Various options are set for the connection: using new URL parser, unified topology, and a maximum pool size of 10
            return mongoose.connect(secretConfig.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 10
            });
        } catch (err) {
            // Logging the error and rejecting the promise with the error object
            log.error(err);
            return Promise.reject(err);
        }
    }

    // Static method to initialize MongoDB connections (currently only initializing the primary connection)
    static async initialize() {
        try {
            // Resolving the promise with the result of initializing the primary connection
            return Promise.resolve(this.initializePrimary());
        } catch (err) {
            // Logging the error and rejecting the promise with the error object
            log.error(err);
            return Promise.reject(err);
        }
    }

    // Static method to close the MongoDB connection
    static async close() {
        try {
            // Resolving the promise with the result of closing the primary connection
            return Promise.resolve(primaryConn.close());
        } catch (err) {
            // Logging the error and rejecting the promise with the error object
            log.error(err);
            return Promise.reject(err);
        }
    }
}

// Exporting the MongooseConnector class to be used in other modules
module.exports = MongooseConnector;