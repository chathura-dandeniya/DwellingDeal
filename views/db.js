const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://atbin22:Atbin67kh@cluster0.akzej1n.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect();

module.exports = client;