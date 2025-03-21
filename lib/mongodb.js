import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://kunalk:mongoKunalGym@ac-limrpmj-shard-00-00.lnumg7p.mongodb.net:27017,ac-limrpmj-shard-00-01.lnumg7p.mongodb.net:27017,ac-limrpmj-shard-00-02.lnumg7p.mongodb.net:27017/?ssl=true&replicaSet=atlas-d8f8n1-shard-0&authSource=admin&retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase; 