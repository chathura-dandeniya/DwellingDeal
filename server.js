// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const engine = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');
var path = require('path');
const {MongoClient, ServerApiVersion } = require('mongodb');



//configure global pathway
// global.appRoot = path.resolve(__dirname);

const app = express();
//MongoDB Connection string
const uri = "mongodb+srv://s222489357-ecommerce:Abcde.1234@cluster0.ivsfcrm.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         depreciationErrors: true,
//     }
// });

const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public')) //set home folder to serve files from
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Session configuration with MongoDB as session store
app.use(session({
    store: MongoStore.create({
        mongoUrl: uri
    }),
    resave: true,
    saveUninitialized: true,
    secret: "Abcde.1234"
}));
app.use(flash()); // Enable flash messages
// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Configure view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Import routes
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
// const paymentRoutes = require('./routes/paymentRoutes');
// const productRoutes = require('./routes/productRoutes');

// Register routes
app.use(mainRoutes);
app.use(userRoutes);
// app.use(paymentRoutes);
app.use('/api/products', require('./routes/productRoutes'));


//start the server
app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
    console.log("Press ctrl+c to shutdown");
})


