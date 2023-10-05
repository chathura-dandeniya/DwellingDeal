const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const multer = require('multer'); // For handling file uploads
const upload = multer(); // Create an instance of multer
const path = require('path'); // For working with file paths
const port = process.env.PORT || 3000; // Corrected the port assignment
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
    collection = client.db().collection('Product');
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
  res.sendFile(path.join(__dirname, 'product.html'));
});

app.use(upload.single('image')); // Middleware for handling file uploads

app.post('/api/addproduct', (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // Convert to a number
    image: req.file ? req.file.buffer : null, // Store file data as a buffer
  };

  postProduct(product, (err, result) => {
    if (!err) {
      res.status(201).json({ statusCode: 201, data: result, message: 'Product added successfully' });
    } else {
      res.status(500).json({ statusCode: 500, error: err, message: 'Error adding the product' });
    }
  });
});
//edit
app.put("/api/product/:name", (req, res) => {
  const nameQuery = req.params.name;
  const { newName, newDescription, newPrice } = req.body;
  // Update the product in the database by name
  updateProduct(nameQuery, { Productname: newName, Description: newDescription, Price: newPrice }, (err, result) => {
    if (!err) {
      if (result.modifiedCount === 0) {
        res.status(404).json({ statusCode: 404, message: 'Product not found' });
      } else {
        res.status(200).json({ statusCode: 200, message: 'Product updated successfully' });
      }
    }
    res.status(500).json({ statusCode: 500, error: err, message: 'Error updating the product' });
  });
});

function updateProduct(prevName, updateData, callback) {
  collection.updateOne(
    { Productname: prevName }, // Filter to find the product by its previous name
    {
      $set: updateData,
    },  // The new data to set for the product
    callback
  );
}

app.delete("/api/product/:name", (req, res) => {
  const productname = req.params.name;

  if (!productname) {
    return res.status(400).json({ statusCode: 400, message: 'Invalid product name' });
  }

  deleteProduct(productname, (err, result) => {
    if (!err) {
      if (result.deletedCount === 0) {
        res.status(404).json({ statusCode: 404, message: 'Product not found' });
      } else {
        res.status(200).json({ statusCode: 200, message: 'Product deleted successfully' });
      }
    } 
    res.status(500).json({ statusCode: 500, error: err, message: 'Error deleting the product' });
  });
});

function deleteProduct(name, callback) {
  collection.deleteOne({ 
    Productname: name
  }, callback);
}

function postProduct(product, callback) {
  collection.insertOne(product, callback);
}

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
  runDBConnection();
});
