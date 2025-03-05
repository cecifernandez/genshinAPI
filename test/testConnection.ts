import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGO_URI!;

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected successfully to MongoDB Atlas");
    await client.close();
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
}

run();