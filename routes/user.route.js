import express from "express";
import {getProfile, updateProfile} from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get('/me', getProfile);

userRouter.put('/me', updateProfile);

export default userRouter;