import mongoose from 'mongoose'

const milestoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 1,
        maxlength: 200
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        default: 'in-progress',
        enum: ['in-progress', 'done', 'failed', 'archived'],
    },
    goal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal',
        required: [true, 'Goal is required'],
        index: true,
    }
})

const Milestone = mongoose.model('Milestone', milestoneSchema)

export default Milestone