const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://atbin22:Atbin67kh@cluster0.akzej1n.mongodb.net/'; 
const dbName = 'sample_supplies'; // our database name
const collectionName = 'product'; 

const client = new MongoClient(uri, { useNewUrlParser: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Export the connection for use in other parts of application
module.exports = {
  connect,
}


async function addProduct(product) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(product);
    console.log(`Product added with ID: ${result.insertedId}`);
    return result.insertedId;
  } catch (err) {
    console.error('Error adding product:', err);
    throw err;
  }
}

async function getProducts() {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Retrieve all products from the collection
    const products = await collection.find({}).toArray();
    return products;
  } catch (err) {
    console.error('Error retrieving products:', err);
    throw err;
  }
}

async function deleteProduct(productId) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Delete the product by its ID
    const result = await collection.deleteOne({ _id: new ObjectId(productId) });
    if (result.deletedCount === 1) {
      return true; // Product deleted successfully
    } else {
      return false; // Product not found
    }
  } catch (err) {
    console.error('Error deleting product:', err);
    throw err;
  }
}

module.exports = {
  connect,
  addProduct,
  getProducts,
  deleteProduct,
};
