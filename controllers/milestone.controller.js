import Milestone from "../models/milestone.model.js";
import mongoose from "mongoose";

export const createMilestone = async (req, res, next) => {
    const session = await mongoose.startSession()
    await session.startTransaction()

    try {
        let allowedFields = ['name', 'description', 'status']

        let milestoneData = {userID: req.user._id, goalID: req.params.id}
        for (let key of allowedFields) {
            if (req.body[key] !== undefined) {
                milestoneData[key] = req.body[key]
            }
        }

        let milestone = await Milestone.create([milestoneData], {session})

        await session.commitTransaction()
        await session.endSession()

        res.status(201).json({
            success: true,
            message: 'Milestone created successfully.',
            data: {
                milestone: milestone
            }
        })
    } catch (e) {
        await session.abortTransaction()
        await session.endSession()
        next(e);
    }
}

export const getMilestones = async (req, res, next) => {
    try {
        let milestones = await Milestone.find({
            userID: req.user._id,
            goalID: req.params.id
        })

        res.status(200).json({
            success: true,
            message: 'Fetched milestones successfully.',
            data: {
                milestones: milestones
            }
        })
    } catch (e) {
        next(e);
    }
}

export const getMilestone = async (req, res, next) => {
    try {
        let milestone = await Milestone.findOne({userID: req.user._id, _id: req.params.id})
        if (!milestone) {
            let error = new Error('Milestone not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Fetched milestone successfully.',
            data: {
                milestone: milestone
            }
        })
    } catch (e) {
        next(e);
    }
}