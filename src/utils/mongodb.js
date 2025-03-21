import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-app';
const MONGODB_DB = process.env.MONGODB_DB || 'fitness-app';

// Global variable to cache the MongoDB connection
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If we have a cached connection, return it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // If no connection, create a new one
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // Connect to MongoDB
  const client = await MongoClient.connect(MONGODB_URI);

  const db = client.db(MONGODB_DB);

  // Cache the client and db connections for future use
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

 