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
            error.statusCode = 409
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
        if (session && session.inTransaction()) {
            await session.abortTransaction();
            await session.endSession();
        }
        next(e)
    }
}

export const signIn = async (req, res, next) => {
    try {
        let { email, password } = req.body

        let user = await User.findOne({email}).select('+password')

        if (!user) {
            let error = new Error('User does not exist')
            error.statusCode = 404
            throw error
        }

        let correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) {
            let error = new Error('Incorrect password')
            error.statusCode = 401
            throw error
        }

        let token = jwt.sign({userID: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE_IN})

        user = user.toObject();
        delete user.password;

        res.status(200).json({
            success: true,
            message: 'User logged in successfully.',
            data: {
                token: token,
                user: user,
            }
        })
    } catch (e) {
        next(e)
    }
}

export const signOut = async (req, res, next) => {
    res.status(200).json({ message: 'User logged out successfully.' })
}