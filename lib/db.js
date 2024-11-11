import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
//coment

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so we don’t create multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
    console.log("MongoDB connection established in development mode");
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client each time
  client = new MongoClient(uri);
  clientPromise = client.connect();
  console.log("MongoDB connection established in production mode");
}

// Add a callback to log the successful connection
clientPromise
  .then(async (client) => {
    console.log("MongoDB successfully connected");

    // Check the list of databases
    const db = client.db(); // Default database
    console.log("Connected to database:", db.databaseName);

    // Check the available collections
    const collections = await db.listCollections().toArray();
    console.log("Available collections:", collections);

    // You can create and insert into a collection
    const collection = db.collection('abel');

    // Insert sample data into the collection
    const result = await collection.insertOne({
      email: 'example@example.com',
      status: 'complete',
      progress: { step1: 'green', step2: 'yellow' },
    });
    console.log("Inserted document into 'abel' collection:", result);

  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default clientPromise;
