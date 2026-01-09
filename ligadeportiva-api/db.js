const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectDB() {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();

  console.log('Conectado a MongoDB Atlas');

  db = client.db('LigaDeportiva');
  return db;
}

module.exports = { connectDB };
