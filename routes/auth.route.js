import express from 'express'
import {signUp} from "../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post('/sign-up', signUp)

authRouter.post('/sign-in', async (req, res) => {
    res.send('Login')
})

authRouter.delete('/sign-out', async (req, res) => {
    res.send('Logout')
})

export default authRouter