import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    items: [
        {
            type: String,
            trim: true
        }
    ]
})

const ToDo = mongoose.model('ToDo', todoSchema)

export default ToDo