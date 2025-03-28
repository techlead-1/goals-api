import express from 'express'
import {signIn, signOut, signUp} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router()

authRouter.post('/sign-up', signUp)

authRouter.post('/sign-in', signIn)

authRouter.delete('/sign-out', authMiddleware, signOut)

export default authRouter