import mongoose from "mongoose";

const stickySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Sticky = mongoose.model('Sticky', stickySchema)

export default Sticky