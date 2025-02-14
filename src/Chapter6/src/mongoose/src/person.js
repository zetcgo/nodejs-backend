import { Schema, model } from 'mongoose';

const personSchema = new Schema({
    name: String,
    age: Number,
    email: { type: String, unique: true },
});

export default model('Person', personSchema);
