import express from "express";

const userRouter = express.Router()

userRouter.get('/me', async (req, res) => {
    res.send('My profile')
})

userRouter.put('/me', async (req, res) => {
    res.send('Update profile')
})

export default userRouter;