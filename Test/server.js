const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const multer = require('multer'); // For handling file uploads
const upload = multer(); // Create an instance of multer
const path = require('path'); // For working with file paths
const port = process.env.PORT || 3000; // Corrected the port assignment
const bodyParser = require("body-parser");

const uri = "mongodb+srv://atbin22:Atbin67kh@cluster0.akzej1n.mongodb.net/sample_supplies?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let collection; // Define the collection variable

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db().collection('User');
    console.log('Connected to the database');
  } catch (ex) {
    console.error(ex);
  }
}

app.use(express.static(__dirname)); // Serve static files from the current directory
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  // Use res.sendFile to send the 'index.html' file
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/api/adduser', function (req, res) {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phonenumber: parseFloat(req.body.phonenumber), // Convert to a number
    password: req.body.password,

    
  };

  postuser(user, (err, result) => {
    if (!err) {
      res.status(201).json({ statusCode: 201, data: result, message: 'user added successfully' });
    } else {
      res.status(500).json({ statusCode: 500, error: err, message: 'Error adding the User' });
    }
  });
});


function postuser(user, callback) {
  collection.insertOne(user, callback);
}

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
  runDBConnection();
});
