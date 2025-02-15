import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`;
const client = new MongoClient(uri);

(async () => {
    await client.connect();
    const adminDB = client.db('test').admin();
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);
    return 'OK';
})()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
