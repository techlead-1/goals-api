import { JWT_SECRET, JWT_EXPIRE_IN } from '../config/env.js'
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    let session = await mongoose.startSession();
    session.startTransaction()

    try {
        const { name, email, password, profession } = req.body

        const user = await User.findOne({email})
        if (user) {
            let error = new Error('User already exists')
            error.status = 409
            throw error
        }

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt)
        let users = await User.create([{
            name,
            email,
            password: hashedPassword,
            profession
        }], {session})

        let token = jwt.sign({userID: users[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE_IN})

        await session.commitTransaction()
        await session.endSession()

        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            data: {
                token: token,
                user: users[0],
            }
        })
    } catch (e) {
        await session.abortTransaction()
        await session.endSession()
        next(e)
    }
}

export const signIn = async (req, res, next) => {
    try {

    } catch (e) {
        next(e)
    }
}

export const signOut = async (req, res, next) => {

}