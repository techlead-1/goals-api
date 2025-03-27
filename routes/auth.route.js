import express from 'express'

const authRouter = express.Router()

authRouter.post('/sign-up', async (req, res) => {
    res.send('Sign up')
})

authRouter.post('/sign-in', async (req, res) => {
    res.send('Login')
})

authRouter.post('/sign-out', async (req, res) => {
    res.send('Logout')
})

export default authRouter