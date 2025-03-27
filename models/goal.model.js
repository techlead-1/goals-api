import mongoose from 'mongoose'

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        enum: ['career', 'health', 'fitness', 'relationships', 'finance', 'travel', 'vacation', 'fun', 'business']
    },
    description: {
        type: String,
        trim: true,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
        validate: {
            validator: function (v) {
                return this.start_date && this.start_date < v
            },
            message: 'End date must be greater than start date'
        },
    },
    status: {
        type: String,
        enum: ['in-progress', 'done', 'failed', 'archived'],
        default: 'in-progress',
        required: [true, 'Status is required'],
    }
})

const Goal = mongoose.model('Goal', goalSchema)

export default Goal