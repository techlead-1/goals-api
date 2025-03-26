import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';
import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the goals API')
})

app.listen(PORT, async () => {
    console.log(`Server started on localhost:${PORT}`);

    await connectToDatabase()
    console.log('Connected to database')
})

export default app;