// src/database/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

let db: Db;

export const connectToDatabase = async (): Promise<void> => {
  try {
    const client = await MongoClient.connect(mongoURI, { });
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    throw new Error('Error connecting to MongoDB');
  }
};

export const getDatabase = (): Db => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};
