import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    profession: {
        type: String,
        trim: true,
        minlength: [3, 'Profession must be at least 3 characters'],
        maxlength: 100,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [5, 'Password must be at least 6 characters'],
        maxlength: 100,
    }
})

const User = mongoose.model('User', userSchema)

export default User