import express from "express";
import {getProfile} from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get('/me', getProfile);

userRouter.put('/me', async (req, res) => {
    res.send('Update profile')
})

export default userRouter;