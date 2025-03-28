import mongoose from 'mongoose';
import Goal from "../models/goal.model.js";

export const createGoal = async (req, res, next) => {
    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
        const allowedFields =  [ 'name', 'description', 'category', 'start_date', 'end_date', 'status' ]

        let goalData = {userID: req.user._id}
        for (let key of allowedFields) {
            if (req.body[key] !== undefined) {
                goalData[key] = req.body[key];
            }
        }

        const goal = await Goal.create([goalData], {session})

        await session.commitTransaction()
        await session.endSession()

        res.status(201).json({
            success: true,
            message: 'Goal created successfully.',
            data: {
                goal: goal[0],
            }
        });
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        next(e)
    }
}

export const getGoals = async (req, res, next) => {
    try {
        const goals = await Goal.find({userID: req.user._id}).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            message: 'Fetched goals successfully.',
            data: {
                goals: goals
            }
        })
    } catch (e) {
        next(e)
    }
}

export const getGoal  = async (req, res, next) => {
    try {
        let goalID = req.params.id;

        let goal = await Goal.findById(goalID)

        if (!goal) {
            let error = new Error('Goal not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Fetched goal successfully.',
            data: {
                goal: goal
            }
        })
    } catch (e) {
        next(e)
    }
}