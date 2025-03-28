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