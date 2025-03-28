import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';
import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import goalRouter from "./routes/goal.route.js";
import milestoneRouter from "./routes/milestone.route.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware);
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authMiddleware, userRouter);
app.use('/api/v1/goals', authMiddleware, goalRouter);
app.use('/api/v1/goals', authMiddleware, milestoneRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the goals API')
})

app.listen(PORT, async () => {
    console.log(`Server started on localhost:${PORT}`);

    await connectToDatabase()
    console.log('Connected to database')
})

export default app;