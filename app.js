import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the goals API')
})

app.listen(PORT, async () => {
    console.log(`Server started on localhost:${PORT}`);

    await connectToDatabase()
    console.log('Connected to database')
})

export default app;