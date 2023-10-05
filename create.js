const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://s223036596:AtbinMaryam4329@cluster0.bmwadx9.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'sample_supplies'; // our database name
const collectionName = 'product'; 

node
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
    const db = client.db(sample_supplies);
    const collection = db.collection(product);

    const result = await collection.insertOne(product);
    console.log(`Product added with ID: ${result.insertedId}`);
    // Create a single new listing
    await createListing(client,
        {
            productname: "Lovely Loft",
            description: "A charming loft in Paris",
            price: 1,
                  }
    );

    return result.insertedId;
  } catch (err) {
    console.error('Error adding product:', err);
    throw err;
  }
}

async function getProduct() {
  try {
    const db = client.db(sample_supplies);
    const collection = db.collection(product);

    // Retrieve all products from the collection
    const product = await collection.find({}).toArray();
    return product;
  } catch (err) {
    console.error('Error retrieving products:', err);
    throw err;
  }
}