// Enforcing strict mode to catch common coding mistakes and "unsafe" actions such as defining global variables
'use strict';

// Importing required modules
const path1 = require('path');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./lib/config');
const logger = require('./lib/logger');
const indexRouter = require('./routes/index');
const MongooseConnector = require('./lib/db/connectors/MongooseConnector');

// Creating a logger instance with specific configurations
const log = logger(config.logger);

// Extracting the base path for API routes from the configuration
const BASE_PATH = config?.api?.base_path;

// Initializing an Express application
const app1 = express();
const app2 = express();

//......................................................... 

//const express = require("express")
app2.use(express.json())

//........................................................

// Setting up the view engine
app1.set('views', path1.join(__dirname, 'views'));
app1.set('view engine', 'pug');

app2.set('view engine', 'ejs'); // Newly added

// Applying middleware to handle CORS, parse JSON, parse URL-encoded data, parse cookies, and serve static files
app1.use(cors({ exposedHeaders: ['x-skip,x-limit,x-total'] }));
app1.use(express.json({ limit: '5mb' }));
app1.use(express.urlencoded({ extended: false, limit: '5mb' }));
app1.use(cookieParser());
app1.use(express.static(path1.join(__dirname, 'public')));

// Using the index router for the base API path
app1.use(`${BASE_PATH}/`, indexRouter);

// Logging all incoming requests
app1.use(function (req, res, next) {
    log.info('REQUEST: ', {
        method: req.method,
        url: req.headers.host + req.originalUrl,
        origin: req.get('origin') || req.get('Origin'),
        body: JSON.stringify(req.body),
        queryParams: JSON.stringify(req.query),
    });
    next();
});

// Using the payment router for the '/payment' path under the base API path
app1.use(`${BASE_PATH}/payment`, require('./routes/payment')());

// Handling 404 errors by forwarding them to the next error handler
app1.use(function (req, res, next) {
    next(createError(404));
});

// Handling all other errors
app1.use(function (err, req, res) {
    log.error(err);
    let status, message;
    if (err?.name === 'ForbiddenError') {
        status = 403;
        message = err?.message;
    } else {
        status = err?.status ? Number(err?.status) : 500;
        message = err?.status ? err?.message : 'something went wrong';
    }
    res?.status(status).send({ error: message });
});

// Exporting a promise that resolves with the Express application once the database has been initialized
module.exports = new Promise(async (resolve, reject) => {
    try {
        // Initializing the database connection using MongooseConnector
        await MongooseConnector.initialize();

        // Resolving the promise with the Express application
        return resolve(app1);
    } catch (e) {
        // Logging the error and rejecting the promise with the error object
        log.error(e);
        return reject(e);
    }
});

//...............................................................
const path2 = require('path');
//..........................Critical Change................................

app2.set('views', path2.join(__dirname, 'views'));
app2.use(express.static(path2.join(__dirname, 'views', 'main')));
//app2.use(express.static(path2.join(__dirname, 'views', 'public')));
//app2.use(express.static(path2.join(__dirname, 'views', 'main')));

app2.get('/cart', (req, res) => {
    res.render('main/cart');
});

// app2.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

//...............................................................................

app2.listen(3002, () => {
    console.log(`App is running on http://localhost:${3002}`);
});
//...............................................................