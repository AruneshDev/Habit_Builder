import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function connectToDatabase() {
    try {
        const client = await clientPromise;
        const db = client.db(dbName);
        console.log("Connected to database");
        return { db, client };
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw new Error("Failed to connect to the database");
    }
}
