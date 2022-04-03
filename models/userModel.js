import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    weight: {
        type: Number,
        required: true,
        default: 0
    },
    isEmailVerified: {
        type: Boolean,
        require: true,
        default: false
    }
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User