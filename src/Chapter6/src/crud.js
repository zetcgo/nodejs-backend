import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster`;
const client = new MongoClient(uri);

(async () => {
    try {
        await client.connect();
        console.log('Successfully Connected to MongoDB');

        const collection = client.db('test').collection('person');
        await collection.insertOne({ name: 'Roy', age: 21 });
        console.log('Successfully Added Document');

        const documents = await collection.find({ name: 'Roy' }).toArray();
        console.log('Found Documents: ', documents);

        await collection.updateOne({ name: 'Roy' }, { $set: { age: 19 } });
        console.log('Successfully Updated Document');

        const updatedDocuments = await collection.find({ name: 'Roy' }).toArray();
        console.log('Updated Documents: ', updatedDocuments);

        await collection.deleteOne({ name: 'Roy' });
        console.log('Successfully Deleted Document');
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
})();
