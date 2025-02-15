import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Person from './person.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(bodyParser.json());
app.listen(3000, async () => {
    console.log('Server running on http://localhost:3000');
    const mongodbUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster`;

    mongoose.connect(mongodbUri).then(() => console.log('Connected to MongoDB'));
});

app.get('/person', async (req, res) => {
    const person = await Person.find({});
    res.send(person);
});

app.get('/person/:email', async (req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.send(person);
});

app.post('/person', async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});

app.put('/person/:email', async (req, res) => {
    const person = await Person.updateOne({ email: req.params.email }, { $set: req.body });
    res.send(person);
});

app.delete('/person/:email', async (req, res) => {
    await Person.deleteOne({ email: req.params.email });
    res.send({ success: true });
});
