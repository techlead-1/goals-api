import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.replace('Bearer ', '');
        }

        if (!token) {
            let error = new Error('No token provided');
            error.status = 401;
            throw error;
        }

        let decodedToken = jwt.verify(token, JWT_SECRET);

        if (!decodedToken) {
            let error = new Error('Invalid token')
            error.status = 401;
            throw error;
        }

        const user = await User.findById(decodedToken.userID)

        if (!user) {
            let error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        req.user = user;
        next()
    } catch (e) {
        next(e);
    }
}

export default authMiddleware;