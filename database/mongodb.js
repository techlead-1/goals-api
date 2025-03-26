import mongoose from 'mongoose';
import {DB_URI} from "../config/env.js";

if (!DB_URI) {
    throw new Error('Mongo DB URI is missing in your environment variables');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`MongoDB Connected successfully.`);
    } catch (err) {
        console.log(`MongoDB connection error: ${err}`);
        process.exit(1);
    }
}

export default connectToDatabase;