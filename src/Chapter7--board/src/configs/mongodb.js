const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`;
module.exports = (callback) => MongoClient.connect(uri, callback);
